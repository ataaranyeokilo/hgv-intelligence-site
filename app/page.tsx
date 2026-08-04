import { Hero, HomeSampleCta } from "@/components/sections/Hero";
import { FeaturedIntelligenceSection } from "@/components/sections/home/FeaturedIntelligenceSection";
import { HomeHeroWeeklyHighlights } from "@/components/sections/home/HomeHeroWeeklyHighlights";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedIntelligenceSection />
      <HomeHeroWeeklyHighlights />
      <HomeSampleCta />
    </>
  );
}
