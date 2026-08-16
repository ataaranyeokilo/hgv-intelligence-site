import type { Metadata } from "next";

import { IntelligenceCompareSection } from "@/components/intelligence/IntelligenceCompareSection";
import { IntelligenceHero } from "@/components/intelligence/IntelligenceHero";
import { IntelligenceStatsBar } from "@/components/intelligence/IntelligenceStatsBar";
import { IntelligenceUnlocksSection } from "@/components/intelligence/IntelligenceUnlocksSection";

export const metadata: Metadata = {
  title: "Intelligence",
  description:
    "Request a quote for enriched UK HGV operator intelligence — direct contacts and company data in Excel.",
};

export default function IntelligencePage() {
  return (
    <>
      <IntelligenceHero />
      <IntelligenceStatsBar />
      <IntelligenceUnlocksSection />
      <IntelligenceCompareSection />
    </>
  );
}
