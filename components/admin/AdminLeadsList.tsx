import type { AdminLeadPerson } from "@/lib/admin/leads";
import { formatLeadSeenAt } from "@/lib/admin/leads";

type AdminLeadsListProps = {
  people: AdminLeadPerson[];
};

export function AdminLeadsList({ people }: AdminLeadsListProps) {
  if (people.length === 0) {
    return (
      <p className="mt-8 text-sm text-neutral-600">
        No emails captured yet. Downloads, contact messages and quote requests
        will appear here.
      </p>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto border border-neutral-200">
      <table className="min-w-full text-left text-sm text-neutral-800">
        <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-500">
          <tr>
            <th className="whitespace-nowrap px-3 py-2 font-medium">Date</th>
            <th className="whitespace-nowrap px-3 py-2 font-medium">Email</th>
            <th className="whitespace-nowrap px-3 py-2 font-medium">Name</th>
            <th className="whitespace-nowrap px-3 py-2 font-medium">Company</th>
            <th className="whitespace-nowrap px-3 py-2 font-medium">Sells to</th>
            <th className="whitespace-nowrap px-3 py-2 font-medium">Coverage</th>
            <th className="whitespace-nowrap px-3 py-2 font-medium">Volume</th>
            <th className="whitespace-nowrap px-3 py-2 font-medium">Phone</th>
            <th className="min-w-[12rem] px-3 py-2 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => {
            const quote = person.quotes[0];
            return (
              <tr
                key={person.email}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <td className="whitespace-nowrap px-3 py-2 text-neutral-500">
                  {formatLeadSeenAt(person.lastSeenAt)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-neutral-900">
                  {person.email}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {person.name ?? "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {quote?.company ?? "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {quote?.sector ?? "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {quote?.region ?? "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {quote?.volume ?? "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {quote?.phone ?? "—"}
                </td>
                <td className="px-3 py-2 text-neutral-600">
                  {quote?.notes ?? person.latestContactMessage ?? "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
