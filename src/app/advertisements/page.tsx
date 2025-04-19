import { advertisements } from "@/lib/placeholder-data";
import AdvertisementsPageClient from "@/components/advertisements/AdvertisementsPageClient";

export const metadata = {
  title: 'Announcements - VirtuMart',
  description: 'Stay updated with our latest announcements, promotions, and articles.',
};

export default function AdvertisementsPage() {
  const sortedAdvertisements = [...advertisements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return <AdvertisementsPageClient sortedAdvertisements={sortedAdvertisements} />;
} 