import { Section } from "@/components/layout/Section";
import { IconCheck } from "@/components/ui/icons";

const points = [
  { title: "UK operator data", detail: "Built from official registration sources." },
  { title: "Updated weekly", detail: "Fresh files every Monday." },
  { title: "Excel-first", detail: "Structured for CRM and dialler import." },
  { title: "Enriched contacts", detail: "Phone numbers where available." },
  { title: "Built for sales teams", detail: "Prospecting-ready lead lists." },
];

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us">
      <h2 className="text-xl font-semibold text-neutral-900">
        Why teams choose HGV Intelligence
      </h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {points.map(({ title, detail }) => (
          <li key={title}>
            <div className="flex gap-2">
              <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                  {detail}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
