import { Hero } from "@/components/sections/Hero";
import { FeaturedIntelligenceSection } from "@/components/sections/home/FeaturedIntelligenceSection";
import { IntelligenceHighlightsBar } from "@/components/sections/home/IntelligenceHighlightsBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedIntelligenceSection />
      <IntelligenceHighlightsBar />
    </>
  );
}
