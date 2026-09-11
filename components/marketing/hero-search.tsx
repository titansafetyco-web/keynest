"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

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
          <span>Location</span>
          <span className="mktFieldInput">
            <MapPin size={15} />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City or neighborhood" />
          </span>
        </label>
        <label className="mktField">
          <span>Bedrooms</span>
          <select value={beds} onChange={e => setBeds(e.target.value)}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>
        <label className="mktField">
          <span>Property Type</span>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">Any</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <button className="mktSearchBtn" type="submit"><Search size={16} /> Search</button>
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
