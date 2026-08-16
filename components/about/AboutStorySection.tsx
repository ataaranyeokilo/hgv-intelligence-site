import { pageContainerClass } from "@/lib/layout";

export function AboutStorySection() {
  return (
    <section className="border-b border-neutral-200">
      <div className={`${pageContainerClass} py-14 sm:py-16`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:divide-x lg:divide-neutral-200">
          <div className="lg:pr-12">
            <h2 className="text-xl font-semibold text-neutral-900">Who we are</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Fleet Signal helps businesses selling into the UK transport
              industry discover newly registered operators through structured
              commercial data.
            </p>
          </div>
          <div className="lg:pl-12">
            <h2 className="text-xl font-semibold text-neutral-900">
              Why we built Fleet Signal
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Sales teams spend too much time collecting, cleaning and
              organising operator data.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Our goal is to reduce that manual work by delivering clean weekly
              Excel reports ready for prospecting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
