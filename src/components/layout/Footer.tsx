import Link from 'next/link';
import SocialBar from '@/components/ui/SocialBar';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-10 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 space-x-4">
          <Link href="/contact" className="hover:text-blue-500">Contact</Link>
          <Link href="/faq" className="hover:text-blue-500">FAQ</Link>
          <Link href="/terms" className="hover:text-blue-500">Terms</Link>
          <Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
        </div>
        <div className="mb-4">
          <SocialBar /> {/* SocialBar styling needs update too */}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} VirtuMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 