"use client"; // Mark as client component

import Link from 'next/link';
import SocialBar from '@/components/ui/SocialBar';
import { useLanguage } from "@/contexts/LanguageContext";
import { STORE_NAME } from "@/config/constants";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

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
          {t('footer_copyright').replace('{year}', currentYear.toString()).replace('{storeName}', STORE_NAME)}
        </div>
        <div className="space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer_terms')}</Link>
          <span>|</span>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer_privacy')}</Link>
          <span>|</span>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer_contact')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 