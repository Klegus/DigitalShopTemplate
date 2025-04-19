"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Define available languages
type Language = 'en' | 'pl';

// Define the shape of translation strings
interface Translations {
  [key: string]: string;
}

// Define the context value type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Translation function
}

// Define translations for each language
const translations: Record<Language, Translations> = {
  en: {
    // Navbar
    home: "Home",
    products: "Products",
    announcements: "Announcements",
    faq: "FAQ",
    contact: "Contact",
    cart: "Cart",
    // Products Page
    our_products: "Our Products",
    view_all_products: "View all products",
    search_products_placeholder: "Search products...",
    no_products_found: "No products found matching your search.",
    // Product Detail Page
    quantity: "Quantity",
    full_product_description: "Product Details",
    related_products_title: "You Might Also Like",
    // Product Interaction
    add_to_cart: "Add to Cart",
    add_quantity_to_cart: "Add {quantity} to Cart",
    // Cart Page
    cart_page_title: "Your Shopping Cart",
    empty_cart_message: "Your cart is currently empty.",
    continue_shopping: "Continue Shopping",
    cart_header_product: "Product",
    cart_header_quantity: "Quantity",
    cart_header_price: "Price",
    cart_header_subtotal: "Subtotal",
    remove_item_label: "Remove item",
    cart_total: "Total",
    proceed_to_checkout: "Proceed to Checkout",
    processing: "Processing...",
    checkout_successful: "Checkout successful!", // For alert
    // Advertisements Page
    all_filter: "All",
    promotions_filter: "Promotions",
    collections_filter: "Collections",
    guides_filter: "Guides",
    sustainability_filter: "Sustainability",
    view_all_announcements: "View all announcements",
    announcements_page_title: "Announcements",
    announcements_page_description: "Stay updated with our latest news, promotions, and articles. Discover what\'s new at {storeName}.",
    // Advertisement Detail Page
    share: "Share:",
    back_to_announcements: "Back to Announcements",
    announcement_not_found_title: "Announcement Not Found",
    announcement_not_found_description: "The requested announcement could not be found.",
    // Contact Page
    contact_page_title: "Contact Us",
    contact_intro: "Have questions or need support? Fill out the form below, and we\'ll get back to you promptly.",
    form_label_name: "Name",
    form_placeholder_name: "Your Name",
    form_label_email: "Email",
    form_placeholder_email: "you@example.com",
    form_label_message: "Message",
    form_placeholder_message: "Your message...",
    form_button_send: "Send Message",
    form_success_alert: "Message sent! (Placeholder)", // For alert
    // Hero Section
    hero_welcome: "Welcome to {storeName}",
    hero_subtitle: "Your one-stop shop for digital keys, licenses, and subscriptions. Instant delivery, secure checkout.",
    // Footer
    footer_copyright: "© {year} {storeName}. All rights reserved.",
    footer_terms: "Terms of Service",
    footer_privacy: "Privacy Policy",
    footer_contact: "Contact Us",
  },
  pl: {
    // Navbar
    home: "Główna",
    products: "Produkty",
    announcements: "Ogłoszenia",
    faq: "FAQ",
    contact: "Kontakt",
    cart: "Koszyk",
    // Products Page
    our_products: "Nasze Produkty",
    search_products_placeholder: "Szukaj produktów...",
    no_products_found: "Nie znaleziono produktów pasujących do wyszukiwania.",
    // Product Detail Page
    quantity: "Ilość",
    full_product_description: "Szczegóły Produktu",
    related_products_title: "Może Cię również zainteresować",
    // Product Interaction
    add_to_cart: "Dodaj do Koszyka",
    add_quantity_to_cart: "Dodaj {quantity} do Koszyka",
    // Cart Page
    cart_page_title: "Twój Koszyk",
    empty_cart_message: "Twój koszyk jest obecnie pusty.",
    continue_shopping: "Kontynuuj Zakupy",
    cart_header_product: "Produkt",
    cart_header_quantity: "Ilość",
    cart_header_price: "Cena",
    cart_header_subtotal: "Suma",
    remove_item_label: "Usuń przedmiot",
    cart_total: "Łącznie",
    proceed_to_checkout: "Przejdź do Kasy",
    processing: "Przetwarzanie...",
    checkout_successful: "Płatność zakończona sukcesem!", // For alert
    // Advertisements Page
    all_filter: "Wszystkie",
    promotions_filter: "Promocje",
    collections_filter: "Kolekcje",
    guides_filter: "Poradniki",
    sustainability_filter: "Eko",
    announcements_page_title: "Ogłoszenia",
    announcements_page_description: "Bądź na bieżąco z naszymi najnowszymi wiadomościami, promocjami i artykułami. Odkryj nowości w {storeName}.",
    // Advertisement Detail Page
    share: "Udostępnij:",
    back_to_announcements: "Wróć do Ogłoszeń",
    announcement_not_found_title: "Nie znaleziono Ogłoszenia",
    announcement_not_found_description: "Żądane ogłoszenie nie mogło zostać znalezione.",
    // Contact Page
    contact_page_title: "Skontaktuj się z Nami",
    contact_intro: "Masz pytania lub potrzebujesz wsparcia? Wypełnij poniższy formularz, a my skontaktujemy się z Tobą niezwłocznie.",
    form_label_name: "Imię",
    form_placeholder_name: "Twoje Imię",
    form_label_email: "Email",
    form_placeholder_email: "ty@example.com",
    form_label_message: "Wiadomość",
    form_placeholder_message: "Twoja wiadomość...",
    form_button_send: "Wyślij Wiadomość",
    form_success_alert: "Wiadomość wysłana! (Placeholder)", // For alert
    // Hero Section
    hero_welcome: "Witaj w {storeName}",
    hero_subtitle: "Twój kompleksowy sklep z kluczami cyfrowymi, licencjami i subskrypcjami. Natychmiastowa dostawa, bezpieczna płatność.",
    // Footer
    footer_copyright: "© {year} {storeName}. Wszelkie prawa zastrzeżone.",
    footer_terms: "Warunki Świadczenia Usług",
    footer_privacy: "Polityka Prywatności",
    footer_contact: "Kontakt",
  },
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  // Translation function using memoization for performance
  const t = useMemo(() => (key: string): string => {
    return translations[language][key] || key; // Return translation or the key itself if not found
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 