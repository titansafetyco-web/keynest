import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { communities, communityStats } from "@/lib/mock-data";

export default function Communities() {
  return (
    <section className="mktSection mktCommunity">
      <div className="mktWrap">
        <div className="mktSplit">
          <div>
            <div className="mktEyebrow">Join a Community</div>
            <h2>People Like You.<br />Places You Love.</h2>
            <p>Explore neighborhoods, follow agents, and be part of a real estate community that moves forward.</p>
            <Link href="/communities" className="mktBtn">Explore Communities <ArrowRight size={14} /></Link>
          </div>
          <div className="mktCityGrid">
            {communities.map(c => (
              <Link href="/communities" className="mktCity" key={c.name}>
                <img src={c.image} alt={c.name} />
                <div>
                  <strong>{c.name}</strong>
                  <span>{c.members}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mktStats">
          {communityStats.map(s => (
            <div key={s.label} className="mktStat">
              <Home size={16} />
              <div>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
          <div className="mktStatsNote">
            <Home size={16} />
            <span>A more connected tomorrow</span>
          </div>
        </div>
      </div>
    </section>
  );
}
