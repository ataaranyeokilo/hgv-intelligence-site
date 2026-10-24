import assert from "node:assert/strict";
import { test } from "node:test";

import { checkDownloadEmail, normaliseEmailInput } from "./email-validation";

function reasonFor(raw: string): string {
  const result = checkDownloadEmail(raw);
  return result.ok ? "ok" : result.reason;
}

test("accepts real-looking work and personal addresses", () => {
  assert.equal(reasonFor("jane.smith@haulage-co.co.uk"), "ok");
  assert.equal(reasonFor("ops+hgv@fleet.example-transport.com"), "ok");
  assert.equal(reasonFor("sam@gmail.com"), "ok");
  assert.equal(reasonFor("info@company.om"), "ok");
});

test("normalises what people paste around an address", () => {
  assert.equal(normaliseEmailInput("  Jane@Haulage.co.uk  "), "jane@haulage.co.uk");
  assert.equal(normaliseEmailInput("mailto:jane@haulage.co.uk"), "jane@haulage.co.uk");
  assert.equal(normaliseEmailInput("<jane@haulage.co.uk>"), "jane@haulage.co.uk");
  assert.equal(normaliseEmailInput("jane@haulage.co.uk."), "jane@haulage.co.uk");
  assert.equal(normaliseEmailInput("jane​@haulage.co.uk"), "jane@haulage.co.uk");

  const result = checkDownloadEmail(" Jane@Haulage.co.uk ");
  assert.deepEqual(result, { ok: true, email: "jane@haulage.co.uk" });
});

test("rejects anything that is not a plain email shape", () => {
  for (const raw of [
    "",
    "jane",
    "jane@",
    "@haulage.co.uk",
    "jane@haulage",
    "jane@@haulage.co.uk",
    "jane..smith@haulage.co.uk",
    ".jane@haulage.co.uk",
    "jane@-haulage.co.uk",
    "jane smith@haulage.co.uk",
    "jane@haulage.co.uk; drop table leads;--",
    "x'--@haulage.co.uk",
    "<script>@haulage.co.uk",
    "\"jane\"@haulage.co.uk",
    "jané@haulage.co.uk",
    "jane@haulаge.co.uk", // Cyrillic "а"
    `${"a".repeat(65)}@haulage.co.uk`,
    `jane@${"a".repeat(250)}.com`,
  ]) {
    assert.equal(reasonFor(raw), "format", raw);
  }
});

test("rejects test and placeholder addresses", () => {
  for (const raw of [
    "test@test.com",
    "test@haulage.co.uk",
    "jane@example.com",
    "jane@example.co.uk",
    "asdf@asdf.com",
    "noreply@haulage.co.uk",
    "aaaa@haulage.co.uk",
    "123456@haulage.co.uk",
    "jane@site.test",
    "jane@server.local",
  ]) {
    assert.equal(reasonFor(raw), "placeholder", raw);
  }
});

test("rejects temporary inboxes", () => {
  assert.equal(reasonFor("jane@mailinator.com"), "disposable");
  assert.equal(reasonFor("jane@yopmail.com"), "disposable");
  assert.equal(reasonFor("jane@eu.mailinator.com"), "disposable");
});

test("catches domain typos and suggests the fix", () => {
  const gmail = checkDownloadEmail("jane@gmial.com");
  assert.equal(gmail.ok, false);
  assert.equal(gmail.ok ? undefined : gmail.suggestion, "jane@gmail.com");

  const tld = checkDownloadEmail("jane@haulage.con");
  assert.equal(tld.ok ? undefined : tld.suggestion, "jane@haulage.com");

  const couk = checkDownloadEmail("jane@hotmail.co");
  assert.equal(couk.ok ? undefined : couk.suggestion, "jane@hotmail.co.uk");
});
