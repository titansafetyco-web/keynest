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
          <Link href="/explore" className="mktBtn">Start Exploring <ArrowRight size={14} /></Link>
        </div>
        <div className="mktVideo">
          <img
            src="/images/housepool.webp"
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
