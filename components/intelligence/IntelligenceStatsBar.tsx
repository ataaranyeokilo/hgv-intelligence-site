import { pageContainerClass } from "@/lib/layout";

const stats = [
  { value: "Scored", label: "Leads ranked so you can prioritise outreach" },
  { value: "200+", label: "Newly licensed operators each week" },
  { value: "48h", label: "Typical delivery after quote accepted" },
];

export function IntelligenceStatsBar() {
  return (
    <section className="bg-white">
      <div className={`${pageContainerClass} py-8 sm:py-10`}>
        <ul className="grid divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map(({ value, label }) => (
            <li
              key={value}
              className="py-5 text-center first:pt-0 last:pb-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0 sm:text-left"
            >
              <p className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                {value}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
