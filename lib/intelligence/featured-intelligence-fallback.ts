export type FeaturedIntelligenceFallbackSlide = {
  title: string;
  category: string;
  summary: string;
  isFallback: true;
};

/** Temporary slides when no published reports exist — remove when live data is seeded. */
export const featuredIntelligenceFallbackSlides: FeaturedIntelligenceFallbackSlide[] =
  [
    {
      isFallback: true,
      title: "UK HGV Market Outlook Q2 2026",
      category: "Quarterly report",
      summary:
        "Operator registrations increased across the UK, with regional shifts and fleet activity trends to support commercial planning.",
    },
    {
      isFallback: true,
      title: "Weekly HGV operator registrations",
      category: "Weekly report",
      summary:
        "Newly registered operators from the previous seven days, structured for sales and outreach teams.",
    },
    {
      isFallback: true,
      title: "UK fleet trends and operator growth",
      category: "Fleet trends",
      summary:
        "How vehicle counts and operator mix are shifting across key regions — concise signals for market teams.",
    },
    {
      isFallback: true,
      title: "Regional HGV operator analysis",
      category: "Regional analysis",
      summary:
        "Where registration activity is strongest and how regional patterns compare week on week.",
    },
  ];
