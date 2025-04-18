"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Advertisement } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface AdvertCardProps {
  advert: Advertisement;
}

const AdvertCard: React.FC<AdvertCardProps> = ({ advert }) => {
  // Format the date to show "X days/hours ago"
  const formattedDate = formatDistanceToNow(new Date(advert.date), { addSuffix: true });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out glossy-effect">
      <Link href={`/advertisements/${advert.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          {advert.imageUrl ? (
            <Image
              src={advert.imageUrl}
              alt={advert.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5M8 12h4m-4 4h4m6 2h2"></path>
              </svg>
            </div>
          )}
          <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
            {advert.category}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
            {advert.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {advert.description}
          </p>
          
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>{advert.author}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdvertCard; 