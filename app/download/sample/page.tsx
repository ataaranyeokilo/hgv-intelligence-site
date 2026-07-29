import { redirect } from "next/navigation";

type SampleDownloadRedirectProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function SampleDownloadRedirectPage({
  searchParams,
}: SampleDownloadRedirectProps) {
  const { token } = await searchParams;
  if (token) {
    redirect(`/download/verify?token=${encodeURIComponent(token)}`);
  }
  redirect("/intelligence#sample-download");
}
