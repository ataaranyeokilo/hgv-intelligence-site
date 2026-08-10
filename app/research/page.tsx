import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Research",
  description: "Research from HGV Intelligence.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="Research"
        description="Research content coming soon."
      />
      <Section>{null}</Section>
    </>
  );
}
