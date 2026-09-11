import HeroDiscover from "@/components/marketing/hero-discover";
import FeaturedProperties from "@/components/marketing/featured-properties";
import Communities from "@/components/marketing/communities";
import Opportunities from "@/components/marketing/opportunities";
import TopAgents from "@/components/marketing/top-agents";
import AppPromo from "@/components/marketing/app-promo";
import Newsletter from "@/components/marketing/newsletter";

export default function LandingPage() {
  return (
    <>
      <HeroDiscover />
      <FeaturedProperties />
      <Communities />
      <Opportunities />
      <TopAgents />
      <AppPromo />
      <Newsletter />
    </>
  );
}
