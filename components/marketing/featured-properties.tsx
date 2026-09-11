"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { featuredListings } from "@/lib/mock-data";

const tabs = [
  { id: "for-you", label: "For You" },
  { id: "latest", label: "Latest" },
  { id: "luxury", label: "Luxury" },
  { id: "price-drop", label: "Price Drop" }
] as const;

export default function FeaturedProperties() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("for-you");
  const list = tab === "for-you"
    ? featuredListings
    : featuredListings.filter(p => p.category === tab);

  return (
    <section className="mktSection">
      <div className="mktWrap">
        <div className="mktSectionHead">
          <div>
            <div className="mktEyebrow">Featured Properties</div>
            <h2>Curated for What&apos;s Next</h2>
            <p>Exceptional homes. Trusted agents. Real opportunities.</p>
          </div>
          <div className="mktTabs">
            {tabs.map(t => (
              <button key={t.id} type="button" className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mktFeaturedGrid">
          {list.map(p => (
            <Link href={`/property/${p.id}`} className="mktListing" key={p.id}>
              <div className="mktListingMedia">
                <img src={p.image} alt={p.address} />
                {p.badge && <span className={`mktBadge ${p.badge === "Price Drop" ? "drop" : ""}`}>{p.badge}</span>}
                <button type="button" className="mktHeart" aria-label="Save" onClick={e => e.preventDefault()}>
                  <Heart size={14} />
                </button>
              </div>
              <div className="mktListingBody">
                <div className="mktPrice">{p.price}</div>
                <div className="mktAddress">{p.address}</div>
                <div className="mktMeta">{p.beds} bd · {p.baths} ba · {p.sqft} sqft · {p.city}</div>
                <div className="mktAgentRow">
                  <img src={p.agentImage} alt={p.agent} />
                  <div>
                    <strong>{p.agent}</strong>
                    <span>{p.agentTitle}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
