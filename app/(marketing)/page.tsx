import HeroDiscover from "@/components/marketing/hero-discover";
import FeaturedProperties from "@/components/marketing/featured-properties";
import Communities from "@/components/marketing/communities";
import Opportunities from "@/components/marketing/opportunities";
import TopAgents from "@/components/marketing/top-agents";
import AppPromo from "@/components/marketing/app-promo";
import Newsletter from "@/components/marketing/newsletter";
import { loadCreators, loadFeaturedListings } from "@/lib/keynest";

export default async function LandingPage() {
  const [listings, people] = await Promise.all([loadFeaturedListings(), loadCreators()]);
  return (
    <>
      <HeroDiscover listings={listings} />
      <FeaturedProperties listings={listings} />
      <Communities />
      <Opportunities />
      <TopAgents people={people} />
      <AppPromo />
      <Newsletter />
    </>
  );
}
