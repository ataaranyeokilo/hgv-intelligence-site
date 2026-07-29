type WeeklyReportPlaceholderCardProps = {
  title: string;
  summary: string;
};

export function WeeklyReportPlaceholderCard({
  title,
  summary,
}: WeeklyReportPlaceholderCardProps) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-6">
      <span className="inline-flex w-fit rounded-sm border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
        Weekly report
      </span>
      <h2 className="mt-4 text-lg font-semibold leading-snug text-neutral-900">
        {title}
      </h2>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
        {summary}
      </p>
      <p className="mt-8 text-sm font-medium text-neutral-400">Coming soon</p>
    </article>
  );
}
