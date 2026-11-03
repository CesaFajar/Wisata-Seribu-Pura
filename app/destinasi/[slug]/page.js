import DestinationDetailPage from "@/components/pages/DestinationDetailPage";
import { destinations } from "@/data/destinations";

export function generateStaticParams() {
  return destinations.map((item) => ({ slug: item.slug }));
}

export default async function DestinationDetailRoute({ params }) {
  const { slug } = await params;
  return <DestinationDetailPage slug={slug} />;
}
