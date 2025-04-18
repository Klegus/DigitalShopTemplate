import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { advertisements } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';

interface AdvertDetailPageProps {
  params: {
    advertId: string;
  };
}

export function generateMetadata({ params }: AdvertDetailPageProps): Metadata {
  const advert = advertisements.find(a => a.id === params.advertId);
  
  if (!advert) {
    return {
      title: 'Announcement Not Found',
      description: 'The requested announcement could not be found.',
    };
  }

  return {
    title: `${advert.title} - VirtuMart`,
    description: advert.description,
  };
}

export default function AdvertDetailPage({ params }: AdvertDetailPageProps) {
  const { advertId } = params;
  
  // Find the advertisement by ID
  const advert = advertisements.find(a => a.id === advertId);
  
  // If advertisement not found, show 404
  if (!advert) {
    notFound();
  }
  
  // Format date
  const formattedDate = format(new Date(advert.date), 'MMMM dd, yyyy');
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb - dark mode text */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
        <Link href="/advertisements" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Announcements</Link>
        <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
        <span className="text-gray-700 dark:text-gray-200 font-medium">{advert.title}</span>
      </nav>
      
      {/* Header - dark mode text */} 
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
            {advert.category}
          </span>
          <time className="text-gray-500 dark:text-gray-400 text-sm" dateTime={advert.date}>{formattedDate}</time>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">{advert.title}</h1>
        
        <div className="flex items-center">
          <div className="mr-3 bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{advert.author}</span>
        </div>
      </header>
      
      {/* Main image */}
      <div className="relative aspect-video w-full mb-10 rounded-lg overflow-hidden">
        <Image
          src={advert.imageUrl}
          alt={advert.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          priority
        />
      </div>
      
      {/* Content - dark mode text for prose */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>{advert.description}</p>
        
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. 
          Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
        </p>
        
        <h2>Key Highlights</h2>
        
        <ul>
          <li>Innovative design principles for modern living</li>
          <li>Sustainable materials sourced from eco-friendly suppliers</li>
          <li>Enhanced comfort with ergonomic considerations</li>
          <li>Versatile style that fits various interior design schemes</li>
        </ul>
        
        <p>
          Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. 
          Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.
        </p>
      </div>
      
      {/* Share and navigation - dark mode styles */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-4 text-gray-700 dark:text-gray-300 font-medium">Share:</span>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Share on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Share on Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Share via Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <Link 
            href="/advertisements" 
            className="flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Announcements
          </Link>
        </div>
      </div>
    </article>
  );
} 