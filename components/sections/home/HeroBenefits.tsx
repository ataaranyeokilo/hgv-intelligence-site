import { Card } from "@/components/ui/Card";

const benefits = [
  "Delivered every Monday",
  "Accurate & Enriched",
  "Excel Ready",
  "Built for Sales Teams",
];

export function HeroBenefits() {
  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-5xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <Card key={benefit} className="text-center text-sm font-medium text-neutral-900">
            {benefit}
          </Card>
        ))}
      </div>
    </section>
  );
}
