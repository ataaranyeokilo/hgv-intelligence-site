const services = [
  {
    title: "Weekly lead reports",
    description:
      "Every week we pull newly registered HGV operators across the UK, clean the records, and enrich contact numbers so your team can start calling on Monday morning.",
  },
  {
    title: "Excel-first delivery",
    description:
      "Reports arrive as structured Excel files — easy to filter, import into your CRM, or hand straight to a telesales team without reformatting.",
  },
  {
    title: "Industry insight",
    description:
      "Free quarterly and yearly reports track fleet trends, regional growth, and operator activity so prospects know you understand the market before you pick up the phone.",
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="border-b border-neutral-200">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          What we do
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">
          HGV Intelligence sits between raw government data and your sales
          pipeline. We turn operator registrations into actionable weekly lead
          files for fuel, insurance, finance, and fleet service providers.
        </p>
        <ul className="mt-14 space-y-12">
          {services.map((service) => (
            <li key={service.title}>
              <h3 className="text-lg font-medium text-neutral-900">
                {service.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
