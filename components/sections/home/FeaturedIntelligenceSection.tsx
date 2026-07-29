import { FeaturedIntelligenceCarousel } from "@/components/sections/home/FeaturedIntelligenceCarousel";
import type { FeaturedIntelligenceSlide } from "@/components/sections/home/FeaturedIntelligenceCarousel";
import { featuredIntelligenceFallbackSlides } from "@/lib/intelligence/featured-intelligence-fallback";
import { pageContainerClass } from "@/lib/layout";
import { formatReportCategoryBadge } from "@/lib/reports/format";
import { listPublishedReports } from "@/lib/reports/queries";
import { selectFeaturedReports } from "@/lib/reports/select-featured-reports";

function summaryOrFallback(summary: string, category: string): string {
  const trimmed = summary.trim();
  if (trimmed) return trimmed;
  const label = formatReportCategoryBadge(category);
  return `Read the latest ${label.toLowerCase()} from HGV Intelligence.`;
}

async function buildFeaturedSlides(): Promise<FeaturedIntelligenceSlide[]> {
  const reports = selectFeaturedReports(await listPublishedReports());

  if (reports.length > 0) {
    return reports.map((report) => ({
      id: report.id,
      title: report.title,
      categoryBadge: formatReportCategoryBadge(report.category).toUpperCase(),
      summary: summaryOrFallback(report.summary, report.category),
      href: `/intelligence/${report.slug}`,
    }));
  }

  return featuredIntelligenceFallbackSlides.map((slide, index) => ({
    id: `featured-fallback-${index}`,
    title: slide.title,
    categoryBadge: slide.category.toUpperCase(),
    summary: slide.summary,
    href: "/intelligence",
  }));
}

export async function FeaturedIntelligenceSection() {
  const slides = await buildFeaturedSlides();
  if (slides.length === 0) return null;

  return (
    <section className="border-b border-neutral-200 bg-neutral-50/50">
      <div className={`${pageContainerClass} py-8 sm:py-10`}>
        <FeaturedIntelligenceCarousel slides={slides} />
      </div>
    </section>
  );
}
