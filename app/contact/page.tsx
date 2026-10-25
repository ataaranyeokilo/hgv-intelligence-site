import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Fleet Signal.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Email</h2>
            <a
              href="mailto:hello@fleetsignal.co.uk"
              className="mt-3 inline-block text-neutral-700 hover:text-neutral-900"
            >
              hello@fleetsignal.co.uk
            </a>
            <p className="mt-8 text-sm text-neutral-600">
              Expected response time: within one business day.
            </p>
          </div>
          <div>
            <div className="mb-10 rounded-sm border border-blue-100 bg-blue-50 p-5">
              <h2 className="text-base font-semibold text-neutral-900">
                Looking for pricing?
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                Tell us your market and we&apos;ll send a quote.
              </p>
              <ButtonLink
                href="/quote"
                className="mt-4 w-full !bg-fleetSignal !text-white shadow-soft hover:!bg-blue-700 sm:w-auto"
              >
                Request a quote
              </ButtonLink>
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Send a message
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
