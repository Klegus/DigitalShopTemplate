import HeroSection from "@/components/home/HeroSection";
import { getTopProducts, getLatestAdvertisements } from "@/lib/placeholder-data";
import HomePageClient from "@/components/home/HomePageClient";

export default function HomePage() {
  const topProducts = getTopProducts(4);
  const latestAdverts = getLatestAdvertisements(3);

  return (
    <div>
      <HeroSection />
      <HomePageClient 
        topProducts={topProducts} 
        latestAdverts={latestAdverts} 
      />
    </div>
  );
}
