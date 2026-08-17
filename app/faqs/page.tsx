import type { Metadata } from "next";

import { FaqsAccordion } from "@/components/faqs/FaqsAccordion";
import { FaqsHero } from "@/components/faqs/FaqsHero";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Common questions about Fleet Signal — what we monitor, who it is for, and how free and paid reports differ.",
};

export default function FaqsPage() {
  return (
    <>
      <FaqsHero />
      <FaqsAccordion />
    </>
  );
}
