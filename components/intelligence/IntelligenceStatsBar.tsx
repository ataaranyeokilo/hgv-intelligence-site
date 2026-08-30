import { pageContainerClass } from "@/lib/layout";

/** Same near-black navy bloom as the homepage intelligence highlights bar. */
const barGradient = [
  "radial-gradient(60% 180% at 100% 0%, rgba(30,111,240,0.7) 0%, rgba(1,72,206,0.4) 32%, rgba(1,35,119,0.14) 55%, transparent 72%)",
  "linear-gradient(90deg, #010512 0%, #010719 45%, #001240 72%, #012377 88%, #0033A1 100%)",
].join(", ");

const stats = [
  { value: "Scored", label: "Leads ranked so you can prioritise outreach" },
  { value: "200+", label: "Newly licensed operators each week" },
  { value: "48h", label: "Typical delivery after quote accepted" },
];

export function IntelligenceStatsBar() {
  return (
    <section
      style={{ backgroundColor: "#010512", backgroundImage: barGradient }}
    >
      <div className={`${pageContainerClass} py-8 sm:py-10`}>
        <ul className="grid divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map(({ value, label }) => (
            <li
              key={value}
              className="py-5 text-center first:pt-0 last:pb-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0 sm:text-left"
            >
              <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {value}
              </p>
              <p className="mt-1 text-sm text-blue-100/80">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
