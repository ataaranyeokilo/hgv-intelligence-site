import { requireAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/service";

export type AdminLeadSource = "quote" | "download" | "contact";

export type AdminQuoteDetails = {
  createdAt: string;
  company: string | null;
  role: string | null;
  sector: string | null;
  region: string | null;
  volume: string | null;
  phone: string | null;
  interest: string | null;
  notes: string | null;
};

export type AdminLeadPerson = {
  email: string;
  name: string | null;
  lastSeenAt: string;
  sources: AdminLeadSource[];
  quotes: AdminQuoteDetails[];
  latestContactMessage: string | null;
  downloadLabel: string | null;
};

type LeadRow = {
  email: string;
  source: string;
  status: string | null;
  created_at: string;
};

type ContactRow = {
  full_name: string;
  email: string;
  message: string;
  created_at: string;
};

type QuoteEnquiryRow = {
  full_name: string;
  work_email: string;
  company: string;
  industry: string;
  regions_of_interest: string;
  reports_required: string;
  additional_information: string | null;
  created_at: string;
};

function labelledValue(message: string, label: string): string | null {
  const match = message.match(new RegExp(`^${label}:\\s*(.+)$`, "m"));
  const value = match?.[1]?.trim();
  if (!value || value === "Not specified") {
    return null;
  }
  return value;
}

function isQuoteMessage(message: string): boolean {
  return message.trim().startsWith("Quote request");
}

function parseQuoteMessage(message: string, createdAt: string): AdminQuoteDetails {
  const lines = message.split("\n");
  const blank = lines.findIndex((line) => line.trim() === "");
  const notes =
    blank === -1 ? "" : lines.slice(blank + 1).join("\n").trim();

  return {
    createdAt,
    company: labelledValue(message, "Company"),
    role: labelledValue(message, "Role"),
    sector: labelledValue(message, "Sector"),
    region: labelledValue(message, "Coverage"),
    volume: labelledValue(message, "Volume"),
    phone: labelledValue(message, "Phone"),
    interest: labelledValue(message, "Interest"),
    notes: notes && notes !== "No extra notes." ? notes : null,
  };
}

function downloadLabel(source: string, verified: boolean): string {
  const kind =
    source === "intelligence_report"
      ? "Report download"
      : source === "weekly_sample"
        ? "Weekly sample"
        : "Sample download";
  return verified ? `${kind} (verified)` : kind;
}

function normaliseEmail(email: string): string {
  return email.trim().toLowerCase().replace(/\.+$/, "");
}

function mergePerson(
  byEmail: Map<string, AdminLeadPerson>,
  email: string,
  patch: {
    name?: string | null;
    at: string;
    source: AdminLeadSource;
    quote?: AdminQuoteDetails;
    contactMessage?: string;
    downloadLabel?: string;
  },
) {
  const key = normaliseEmail(email);
  if (!key) {
    return;
  }

  const existing = byEmail.get(key);
  if (!existing) {
    byEmail.set(key, {
      email: key,
      name: patch.name?.trim() || null,
      lastSeenAt: patch.at,
      sources: [patch.source],
      quotes: patch.quote ? [patch.quote] : [],
      latestContactMessage: patch.contactMessage ?? null,
      downloadLabel: patch.downloadLabel ?? null,
    });
    return;
  }

  if (patch.name?.trim() && !existing.name) {
    existing.name = patch.name.trim();
  }
  if (patch.at > existing.lastSeenAt) {
    existing.lastSeenAt = patch.at;
    if (patch.name?.trim()) {
      existing.name = patch.name.trim();
    }
    if (patch.contactMessage) {
      existing.latestContactMessage = patch.contactMessage;
    }
  }
  if (!existing.sources.includes(patch.source)) {
    existing.sources.push(patch.source);
  }
  if (patch.quote) {
    const already = existing.quotes.some(
      (quote) => quote.createdAt === patch.quote?.createdAt,
    );
    if (!already) {
      existing.quotes.push(patch.quote);
    }
  }
  if (patch.downloadLabel && !existing.downloadLabel) {
    existing.downloadLabel = patch.downloadLabel;
  }
}

export function formatLeadSeenAt(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export async function listAdminLeads(): Promise<AdminLeadPerson[]> {
  await requireAdminUser();
  const supabase = createServiceClient();

  const [leadsResult, contactsResult, quotesResult] = await Promise.all([
    supabase
      .from("leads")
      .select("email, source, status, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("contact_messages")
      .select("full_name, email, message, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("quote_enquiries")
      .select(
        "full_name, work_email, company, industry, regions_of_interest, reports_required, additional_information, created_at",
      )
      .order("created_at", { ascending: false }),
  ]);

  const byEmail = new Map<string, AdminLeadPerson>();

  for (const row of (leadsResult.data ?? []) as LeadRow[]) {
    mergePerson(byEmail, row.email, {
      at: row.created_at,
      source: "download",
      downloadLabel: downloadLabel(row.source, row.status === "verified"),
    });
  }

  for (const row of (contactsResult.data ?? []) as ContactRow[]) {
    if (isQuoteMessage(row.message)) {
      mergePerson(byEmail, row.email, {
        name: row.full_name,
        at: row.created_at,
        source: "quote",
        quote: parseQuoteMessage(row.message, row.created_at),
      });
    } else {
      mergePerson(byEmail, row.email, {
        name: row.full_name,
        at: row.created_at,
        source: "contact",
        contactMessage: row.message,
      });
    }
  }

  for (const row of (quotesResult.data ?? []) as QuoteEnquiryRow[]) {
    mergePerson(byEmail, row.work_email, {
      name: row.full_name,
      at: row.created_at,
      source: "quote",
      quote: {
        createdAt: row.created_at,
        company: row.company,
        role: null,
        sector: row.industry,
        region: row.regions_of_interest,
        volume: row.reports_required,
        phone: null,
        interest: null,
        notes: row.additional_information,
      },
    });
  }

  const unique = new Map<string, AdminLeadPerson>();
  for (const person of byEmail.values()) {
    const email = normaliseEmail(person.email);
    if (unique.has(email)) {
      continue;
    }
    unique.set(email, {
      ...person,
      email,
      quotes: [...person.quotes]
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .slice(0, 1),
      sources: [...person.sources].sort((a, b) => {
        const order: AdminLeadSource[] = ["quote", "download", "contact"];
        return order.indexOf(a) - order.indexOf(b);
      }),
    });
  }

  return [...unique.values()].sort((a, b) =>
    a.lastSeenAt < b.lastSeenAt ? 1 : -1,
  );
}
