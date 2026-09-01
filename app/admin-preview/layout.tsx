import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin preview",
  robots: { index: false, follow: false },
};

export default function AdminPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminShell basePath="/admin-preview" preview>
      {children}
    </AdminShell>
  );
}
