import { ButtonLink } from "@/components/ui/Button";

type AdminReportsIntroProps = {
  newReportHref: string;
};

export function AdminReportsIntro({ newReportHref }: AdminReportsIntroProps) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Admin
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        Reports
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        Research reports on the website. Create a report, attach the file, and
        publish it to add a card on Research.
      </p>
      <div className="mt-10">
        <ButtonLink
          href={newReportHref}
          className="!bg-fleetSignal !text-white hover:!bg-blue-700"
        >
          New report
        </ButtonLink>
      </div>
    </>
  );
}
