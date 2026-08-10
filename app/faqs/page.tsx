import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about HGV Intelligence.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        title="FAQs"
        description="Frequently asked questions coming soon."
      />
      <Section>{null}</Section>
    </>
  );
}
