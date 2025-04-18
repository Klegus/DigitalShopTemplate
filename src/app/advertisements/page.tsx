import { advertisements } from "@/lib/placeholder-data";
import AdvertCard from "@/components/ui/AdvertCard";
import Link from "next/link";

export const metadata = {
  title: 'Announcements - VirtuMart',
  description: 'Stay updated with our latest announcements, promotions, and articles.',
};

export default function AdvertisementsPage() {
  // Sort advertisements by date (newest first)
  const sortedAdvertisements = [...advertisements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Announcements</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Stay updated with our latest news, promotions, and articles. 
          Discover what's new at VirtuMart.
        </p>
      </div>

      {/* Filter/Category navigation */}
      <div className="mb-10 flex justify-center">
        <nav className="flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium transition-colors duration-150">
            All
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
            Promotions
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
            Collections
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
            Guides
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150">
            Sustainability
          </button>
        </nav>
      </div>

      {/* Advertisements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedAdvertisements.map(advert => (
          <AdvertCard key={advert.id} advert={advert} />
        ))}
      </div>
    </div>
  );
} 