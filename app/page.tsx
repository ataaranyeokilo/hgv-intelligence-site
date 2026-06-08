import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FreeReports } from "@/components/sections/FreeReports";
import { Hero } from "@/components/sections/Hero";
import { SampleDownload } from "@/components/sections/SampleDownload";
import { WeeklyLeadReports } from "@/components/sections/WeeklyLeadReports";
import { WhatWeDo } from "@/components/sections/WhatWeDo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <FreeReports />
      <WeeklyLeadReports />
      <SampleDownload />
      <About />
      <Contact />
    </>
  );
}
