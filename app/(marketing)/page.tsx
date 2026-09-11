import HeroSearch from "@/components/marketing/hero-search";
import FeaturedProperties from "@/components/marketing/featured-properties";
import Communities from "@/components/marketing/communities";
import Opportunities from "@/components/marketing/opportunities";
import TopAgents from "@/components/marketing/top-agents";
import AppPromo from "@/components/marketing/app-promo";
import Newsletter from "@/components/marketing/newsletter";

export default function LandingPage() {
  return (
    <>
      <section className="mktHero">
        <img
          className="mktHeroBg"
          src="/images/poolcity.webp"
          alt="Infinity pool overlooking a city skyline"
        />
        <div className="mktHeroShade" />
        <div className="mktHeroInner">
          <div className="mktEyebrow">Real Estate, Reimagined</div>
          <h1>More than a Home.<br />A Brighter Tomorrow.</h1>
          <p className="mktHeroLead">Discover. Share. Invest. Belong.</p>
          <HeroSearch />
        </div>
        <div className="mktCredit">Designed for tomorrow</div>
      </section>
      <FeaturedProperties />
      <Communities />
      <Opportunities />
      <TopAgents />
      <AppPromo />
      <Newsletter />
    </>
  );
}
