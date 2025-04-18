// Remove "use client"; - Layout is now a Server Component again

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import BackgroundGlow from "@/components/layout/BackgroundGlow"; // Import the new component
import { CartProvider } from "@/contexts/CartContext"; // Import CartProvider from the correct path
import { ThemeProvider } from "@/components/layout/ThemeProvider"; // Import ThemeProvider
// Removed useState and MouseEvent imports

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Metadata export is now allowed again
export const metadata: Metadata = {
  title: "VirtuMart - Your Virtual Goods Store",
  description: "The best place to buy virtual keys, licenses, and subscriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed mouse state and handler

  return (
    <html lang="en" suppressHydrationWarning> {/* suppressHydrationWarning needed for next-themes */}
      <body
        className={`${poppins.className} flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden`}
      >
        {/* Wrap everything in ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Background glow effect */}
          <BackgroundGlow />

          {/* Wrap content in CartProvider */}
          <CartProvider>
            <div className="relative z-10 flex flex-col min-h-screen">
              <header className="w-full py-2 sticky top-0 z-50 bg-transparent">
                <Navbar />
              </header>
              
              <main className="flex-grow bg-transparent"> {/* Ensure main is transparent to see body bg */}
                <PageTransitionWrapper>
                  {children}
                </PageTransitionWrapper>
              </main>
              
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
