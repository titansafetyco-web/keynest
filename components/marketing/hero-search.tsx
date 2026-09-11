"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MapPin, Search } from "lucide-react";

const types = ["House", "Condo", "Land", "Commercial", "Industrial", "Multifamily", "Luxury"];

export default function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("Jersey City, NJ");
  const [beds, setBeds] = useState("");
  const [type, setType] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("q", location);
    if (beds) params.set("beds", beds);
    if (type) params.set("type", type);
    router.push(`/explore?${params.toString()}`);
  }

  return (
    <div className="mktSearchBlock">
      <form className="mktSearch" onSubmit={onSubmit}>
        <label className="mktField">
          <MapPin size={14} />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="City or neighborhood"
            aria-label="Location"
          />
        </label>
        <label className="mktField">
          <select value={beds} onChange={e => setBeds(e.target.value)} aria-label="Bedrooms">
            <option value="">Bedrooms</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
          <ChevronDown size={14} />
        </label>
        <label className="mktField">
          <select value={type} onChange={e => setType(e.target.value)} aria-label="Property type">
            <option value="">Property Type</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown size={14} />
        </label>
        <button className="mktSearchBtn" type="submit">
          <Search size={14} /> Search
        </button>
      </form>
      <div className="mktPills">
        {types.map(t => (
          <button
            key={t}
            type="button"
            className={type === t ? "active" : ""}
            onClick={() => setType(type === t ? "" : t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
