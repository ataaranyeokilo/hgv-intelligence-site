import { ButtonLink } from "@/components/ui/Button";

type AdminLibraryIntroProps = {
  heading: string;
  description: string;
  newHref: string;
  newLabel: string;
};

export function AdminLibraryIntro({
  heading,
  description,
  newHref,
  newLabel,
}: AdminLibraryIntroProps) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
        Admin
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        {heading}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        {description}
      </p>
      <div className="mt-10">
        <ButtonLink
          href={newHref}
          className="w-full !bg-fleetSignal !text-white hover:!bg-blue-700 sm:w-auto"
        >
          {newLabel}
        </ButtonLink>
      </div>
    </>
  );
}
