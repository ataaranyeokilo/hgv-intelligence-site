import type { Metadata } from "next";

import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteHero } from "@/components/quote/QuoteHero";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Request a quote for Fleet Signal Intelligence — weekly UK HGV operator records with the people to call.",
};

type QuotePageProps = {
  searchParams: Promise<{ interest?: string }>;
};

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const { interest } = await searchParams;

  return (
    <>
      <QuoteHero />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fleetSignal">
              What you get
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              We'll quote you for your market
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Price depends on who you sell to, where you cover, and how many
              new operators you want each week.
            </p>
            <ul className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-700">
              <li>
                <span className="font-medium text-neutral-900">
                  Newly licensed operators
                </span>
                {" — "}
                company, licence, fleet size, region and trading style.
              </li>
              <li>
                <span className="font-medium text-neutral-900">
                  Direct contacts
                </span>
                {" — "}
                phone numbers where available, ready for CRM or dialler.
              </li>
              <li>
                <span className="font-medium text-neutral-900">
                  Reply in one business day
                </span>
                {" — "}
                typical delivery within 48 hours once a quote is accepted.
              </li>
            </ul>
            <p className="mt-8 text-sm text-neutral-600">
              Prefer email?{" "}
              <a
                href="mailto:hello@fleetsignal.co.uk"
                className="font-medium text-neutral-900 hover:text-neutral-600"
              >
                hello@fleetsignal.co.uk
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Your market
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              These details help us quote the right slice of the operator file.
            </p>
            <div className="mt-6">
              <QuoteForm interest={interest?.trim() ?? ""} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
