import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";
import BackgroundGlow from "@/components/layout/BackgroundGlow";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "VirtuMart - Your Virtual Goods Store",
  description: "The best place to buy virtual keys, licenses, and subscriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>{/* suppressHydrationWarning needed for next-themes */}
      <body
        className={`${poppins.className} flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CartProvider>
              <BackgroundGlow />
              <div className="relative z-10 flex flex-col min-h-screen">
                <header className="w-full py-2 sticky top-0 z-50 bg-transparent">
                  <Navbar />
                </header>
                
                <main className="flex-grow bg-transparent">
                  {/* Render children directly, removing PageTransitionWrapper */}
                  {children}
                </main>
                
                <Footer />
              </div>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}