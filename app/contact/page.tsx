import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with HGV Intelligence.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Questions about reports or weekly lead data? We are here to help."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Email</h2>
            <a
              href="mailto:hello@hgvintelligence.co.uk"
              className="mt-3 inline-block text-neutral-700 hover:text-neutral-900"
            >
              hello@hgvintelligence.co.uk
            </a>
            <p className="mt-8 text-sm text-neutral-600">
              Expected response time: within one business day.
            </p>
          </div>
          <div>
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
