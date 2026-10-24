/**
 * Server-only: asks DNS (Cloudflare DNS-over-HTTPS) whether a domain can
 * receive email. Only the domain is sent, never the full address.
 */

const DNS_ENDPOINT = "https://cloudflare-dns.com/dns-query";
const LOOKUP_TIMEOUT_MS = 2500;

const DNS_NXDOMAIN = 3;
const DNS_TYPE_MX = 15;

type DnsAnswer = { type: number; data: string };
type DnsResponse = { Status: number; Answer?: DnsAnswer[] };

async function lookup(domain: string, type: "MX" | "A"): Promise<DnsResponse> {
  const url = `${DNS_ENDPOINT}?name=${encodeURIComponent(domain)}&type=${type}`;
  const response = await fetch(url, {
    headers: { Accept: "application/dns-json" },
    signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`DNS lookup failed: ${response.status}`);
  }
  return (await response.json()) as DnsResponse;
}

/**
 * true: the domain has mail servers (or an address, which mail falls back to).
 * false: the domain does not exist or explicitly refuses mail (null MX).
 * null: the lookup itself failed, so the caller should not block on it.
 */
export async function domainAcceptsMail(domain: string): Promise<boolean | null> {
  try {
    const mx = await lookup(domain, "MX");
    if (mx.Status === DNS_NXDOMAIN) {
      return false;
    }

    const mxRecords = (mx.Answer ?? []).filter((answer) => answer.type === DNS_TYPE_MX);
    if (mxRecords.length > 0) {
      // RFC 7505 null MX ("0 .") means the domain accepts no mail.
      return mxRecords.some((record) => record.data.trim().split(/\s+/)[1] !== ".");
    }

    const a = await lookup(domain, "A");
    return (a.Answer ?? []).length > 0;
  } catch (cause) {
    console.error("[domainAcceptsMail]", domain, cause);
    return null;
  }
}
