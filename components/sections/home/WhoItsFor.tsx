import { Section } from "@/components/layout/Section";
import {
  IconBuilding,
  IconFuel,
  IconShield,
  IconTruck,
  IconUsers,
} from "@/components/ui/icons";

const audiences = [
  {
    label: "Fuel suppliers",
    description: "Reach newly licensed operators before competitors do.",
    Icon: IconFuel,
  },
  {
    label: "Commercial insurers",
    description: "Prospect fresh fleets with accurate operator details.",
    Icon: IconShield,
  },
  {
    label: "Finance & leasing",
    description: "Identify growing operators ready for asset finance.",
    Icon: IconBuilding,
  },
  {
    label: "Fleet service suppliers",
    description: "Target businesses adding vehicles and workshop demand.",
    Icon: IconTruck,
  },
  {
    label: "Transport recruiters",
    description: "Find hiring operators as registrations and fleet size grow.",
    Icon: IconUsers,
  },
];

export function WhoItsFor() {
  return (
    <Section id="who-its-for">
      <h2 className="text-xl font-semibold text-neutral-900">Who it&apos;s for</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {audiences.map(({ label, description, Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-sm border border-neutral-200 bg-neutral-50 px-4 py-6 text-center"
          >
            <Icon className="h-7 w-7 text-fleetSignal" />
            <p className="mt-4 text-sm font-semibold text-neutral-900">{label}</p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600">
              {description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
