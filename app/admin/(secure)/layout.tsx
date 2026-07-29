import { AdminShell } from "@/components/admin/AdminShell";
import { assertAdminAccessOrRedirect } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminSecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await assertAdminAccessOrRedirect();

  return <AdminShell>{children}</AdminShell>;
}
