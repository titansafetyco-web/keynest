import StubPage from "@/components/marketing/stub-page";
import Link from "next/link";

export default function PricingPage() {
  return (
    <section className="mktStub">
      <div className="mktEyebrow">Pricing</div>
      <h1>Start free. Grow when you are ready.</h1>
      <p>KeyNest is free to explore. Creator Pro and Boost plans will be published here as billing comes online.</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/signup" className="mktBtn">Get Started</Link>
      </p>
    </section>
  );
}
