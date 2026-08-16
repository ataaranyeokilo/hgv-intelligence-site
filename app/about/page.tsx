import type { Metadata } from "next";

import { AboutCustomersReceiveSection } from "@/components/about/AboutCustomersReceiveSection";
import { AboutDataSourcesSection } from "@/components/about/AboutDataSourcesSection";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStorySection } from "@/components/about/AboutStorySection";
import {
  aboutHowItWorksSteps,
  HowItWorks,
} from "@/components/sections/HowItWorks";
import { WhoItsFor } from "@/components/sections/home/WhoItsFor";

export const metadata: Metadata = {
  title: "About",
  description:
    "HGV operator data built for commercial teams — official UK sources, weekly Excel delivery.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStorySection />
      <AboutDataSourcesSection />
      <HowItWorks steps={aboutHowItWorksSteps} id="about-how-it-works" />
      <WhoItsFor />
      <AboutCustomersReceiveSection />
    </>
  );
}
