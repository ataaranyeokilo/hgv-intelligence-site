/**
 * Download email checks, shared by the form (instant feedback) and the server
 * action (authoritative). Only plain ASCII addresses in a strict shape get
 * through; obvious placeholders, throwaway inboxes and common domain typos are
 * turned away with a message asking for a real address.
 */

export type EmailCheckFailure =
  | "format"
  | "placeholder"
  | "disposable"
  | "typo"
  | "no_mail_domain";

export type EmailCheckResult =
  | { ok: true; email: string }
  | {
      ok: false;
      reason: EmailCheckFailure;
      message: string;
      /** Corrected address for typos, e.g. name@gmail.com. */
      suggestion?: string;
    };

export const EMAIL_MAX_LENGTH = 254;
const LOCAL_MAX_LENGTH = 64;
const LABEL_MAX_LENGTH = 63;

/** Same shape as the download_contacts_email_format check in the database. */
export const EMAIL_SHAPE_RE =
  /^[a-z0-9._%+-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/;

const MESSAGES: Record<EmailCheckFailure, string> = {
  format: "That doesn’t look like an email address. Please check it and try again.",
  placeholder: "Please enter a valid email address.",
  disposable: "Please use your work or personal email, not a temporary inbox.",
  typo: "That email domain looks mistyped.",
  no_mail_domain:
    "We couldn’t find that email domain. Please check the part after the @.",
};

const PLACEHOLDER_LOCAL_PARTS = new Set([
  "test", "testing", "tester", "test1", "test123", "example", "sample", "fake",
  "dummy", "demo", "none", "null", "nobody", "noemail", "nomail", "no-reply",
  "noreply", "donotreply", "email", "youremail", "your.email", "yourname",
  "name", "user", "username", "someone", "somebody", "anonymous", "foo", "bar",
  "foobar", "asdf", "asdfgh", "asdfghjkl", "qwerty", "qwertyuiop", "zxcv",
  "abc", "abcd", "abcde", "abcdef", "abc123", "xyz", "xxx", "123", "1234",
  "12345", "123456", "1234567", "12345678", "spam", "junk", "nope", "na", "n.a",
]);

const PLACEHOLDER_DOMAINS = new Set([
  "example.com", "example.org", "example.net", "example.co.uk", "test.com",
  "test.co.uk", "test.org", "test.net", "testing.com", "fake.com",
  "fakeemail.com", "fakemail.com", "fake.co.uk", "domain.com", "yourdomain.com",
  "yourcompany.com", "company.com", "mycompany.com", "website.com",
  "mysite.com", "sample.com", "asdf.com", "qwerty.com", "abc.com",
  "xyz.com", "aaa.com", "noemail.com", "nomail.com", "none.com", "null.com",
  "nowhere.com", "spam.com",
]);

/** Reserved or internal top-level domains that never receive public email. */
const RESERVED_TLDS = new Set([
  "test", "example", "invalid", "localhost", "local", "internal", "lan",
  "home", "corp", "onion",
]);

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "mailinator.net", "guerrillamail.com", "guerrillamail.net",
  "guerrillamail.org", "guerrillamailblock.com", "sharklasers.com", "grr.la",
  "10minutemail.com", "10minutemail.net", "20minutemail.com", "tempmail.com",
  "temp-mail.org", "temp-mail.io", "tempmail.net", "tempmailo.com",
  "tempail.com", "tempr.email", "tmpmail.org", "tmpmail.net", "yopmail.com",
  "yopmail.net", "yopmail.fr", "trashmail.com", "trashmail.net",
  "trashmail.de", "getnada.com", "nada.email", "dispostable.com",
  "maildrop.cc", "throwawaymail.com", "fakeinbox.com", "mintemail.com",
  "emailondeck.com", "mohmal.com", "burnermail.io", "discard.email",
  "mailnesia.com", "spamgourmet.com", "moakt.com", "mailcatch.com",
  "mytemp.email", "getairmail.com", "emailfake.com", "fakemailgenerator.com",
  "inboxkitten.com", "mail.tm", "spambox.us", "spam4.me", "mailpoof.com",
  "throwam.com", "dropmail.me", "33mailbox.com", "luxusmail.org",
]);

/** Exact mistyped domains → the domain the visitor almost certainly meant. */
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gmaill.com": "gmail.com",
  "gmal.com": "gmail.com", "gamil.com": "gmail.com", "gnail.com": "gmail.com",
  "gmail.co": "gmail.com", "gmail.cm": "gmail.com", "gmail.om": "gmail.com",
  "gmail.co.uk": "gmail.com", "gmali.com": "gmail.com", "gemail.com": "gmail.com",
  "googlemail.co": "googlemail.com",
  "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com",
  "hotmai.com": "hotmail.com", "hotamil.com": "hotmail.com",
  "hotmail.co": "hotmail.co.uk", "hotmail.couk": "hotmail.co.uk",
  "hotmial.co.uk": "hotmail.co.uk",
  "outlok.com": "outlook.com", "outllok.com": "outlook.com",
  "outloo.com": "outlook.com", "outlook.co": "outlook.com",
  "yahooo.com": "yahoo.com", "yaho.com": "yahoo.com", "yahoo.co": "yahoo.co.uk",
  "yahoo.couk": "yahoo.co.uk", "yhaoo.com": "yahoo.com",
  "iclod.com": "icloud.com", "icoud.com": "icloud.com", "icloud.co": "icloud.com",
  "btinternt.com": "btinternet.com", "btinternet.co": "btinternet.com",
  "live.co": "live.co.uk", "sky.co": "sky.com",
};

/** Mistyped endings for any domain, e.g. company.con → company.com. */
const TLD_TYPOS: [RegExp, string][] = [
  [/\.(con|cpm|cmo|comm|coom|vom|xom)$/, ".com"],
  [/\.(couk|co\.k|co\.ul|co\.uj|cp\.uk)$/, ".co.uk"],
  [/\.(nte|ner|nett)$/, ".net"],
  [/\.(ogr|orgg)$/, ".org"],
];

/**
 * Strips what people paste around an address: surrounding spaces, invisible
 * characters, a mailto: prefix, angle brackets and a trailing dot.
 */
export function normaliseEmailInput(raw: string): string {
  return raw
    .replace(/[​-‍⁠﻿]/g, "")
    .trim()
    .replace(/^mailto:/i, "")
    .replace(/^<(.*)>$/, "$1")
    .trim()
    .replace(/\.+$/, "")
    .toLowerCase();
}

function fail(reason: EmailCheckFailure, suggestion?: string): EmailCheckResult {
  const message =
    reason === "typo" && suggestion
      ? `${MESSAGES.typo} Did you mean ${suggestion}?`
      : MESSAGES[reason];
  return { ok: false, reason, message, suggestion };
}

function isDisposable(domain: string): boolean {
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return true;
  }
  for (const listed of DISPOSABLE_DOMAINS) {
    if (domain.endsWith(`.${listed}`)) {
      return true;
    }
  }
  return false;
}

function looksLikeKeyboardMash(local: string): boolean {
  const letters = local.replace(/[._%+-]/g, "");
  return letters.length > 0 && /^(.)\1+$/.test(letters);
}

/** Format, placeholder, throwaway and typo checks. Safe to run in the browser. */
export function checkDownloadEmail(raw: string): EmailCheckResult {
  const email = normaliseEmailInput(raw);

  if (!email || email.length > EMAIL_MAX_LENGTH || !EMAIL_SHAPE_RE.test(email)) {
    return fail("format");
  }

  const at = email.lastIndexOf("@");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const labels = domain.split(".");
  const tld = labels[labels.length - 1];

  if (
    local.length > LOCAL_MAX_LENGTH ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    labels.some((label) => label.length > LABEL_MAX_LENGTH)
  ) {
    return fail("format");
  }

  const typo = DOMAIN_TYPOS[domain];
  if (typo) {
    return fail("typo", `${local}@${typo}`);
  }
  for (const [pattern, ending] of TLD_TYPOS) {
    if (pattern.test(domain)) {
      return fail("typo", `${local}@${domain.replace(pattern, ending)}`);
    }
  }

  if (
    RESERVED_TLDS.has(tld) ||
    PLACEHOLDER_DOMAINS.has(domain) ||
    PLACEHOLDER_LOCAL_PARTS.has(local) ||
    looksLikeKeyboardMash(local)
  ) {
    return fail("placeholder");
  }

  if (isDisposable(domain)) {
    return fail("disposable");
  }

  return { ok: true, email };
}

/** Shown when DNS says the domain cannot receive email (checked on the server). */
export const NO_MAIL_DOMAIN_MESSAGE = MESSAGES.no_mail_domain;
