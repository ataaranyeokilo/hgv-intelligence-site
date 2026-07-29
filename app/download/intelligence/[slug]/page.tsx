import { redirect } from "next/navigation";

type IntelligenceDownloadRedirectProps = {
  params: Promise<{ slug: string }>;
};

export default async function IntelligenceDownloadRedirectPage({
  params,
}: IntelligenceDownloadRedirectProps) {
  const { slug } = await params;
  redirect(`/intelligence/${encodeURIComponent(slug)}?download=1`);
}
