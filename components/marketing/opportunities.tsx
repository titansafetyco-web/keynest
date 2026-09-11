import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Opportunities() {
  return (
    <section className="mktSection">
      <div className="mktWrap mktSplit mktOpp">
        <div>
          <div className="mktEyebrow">Buy. Sell. Invest.</div>
          <h2>Opportunities Live Here.</h2>
          <p>Find homes to love, investments to grow, and a community to belong to.</p>
          <Link href="/explore" className="mktBtn">Start Exploring <ArrowRight size={16} /></Link>
        </div>
        <div className="mktVideo">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
            alt="Interior living space"
          />
          <button type="button" className="mktPlay" aria-label="Watch the story">
            <Play size={22} fill="currentColor" />
          </button>
        </div>
      </div>
    </section>
  );
}
