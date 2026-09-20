"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ChevronDown,
  Factory,
  Gem,
  Home,
  MapPin,
  Search,
  Store,
  Building,
  Trees
} from "lucide-react";
import PlacesLocation from "@/components/marketing/places-location";

const types = [
  { id: "House", icon: Home },
  { id: "Condo", icon: Building2 },
  { id: "Land", icon: Trees },
  { id: "Commercial", icon: Store },
  { id: "Industrial", icon: Factory },
  { id: "Multifamily", icon: Building },
  { id: "Luxury", icon: Gem }
] as const;

const dealOptions = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" }
];

const bedOptions = [
  { value: "", label: "Bedrooms" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" }
];

function FieldPick({
  label,
  value,
  options,
  open,
  onToggle,
  onChange,
  onClose
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  open: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
  onClose: () => void;
}) {
  const selected = options.find(option => option.value === value);

  return (
    <div className="mktPick" onMouseLeave={onClose}>
      <button
        type="button"
        className="mktPickBtn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{selected?.label || label}</span>
        <ChevronDown size={14} />
      </button>
      {open && (
        <ul className="mktPickList" role="listbox" aria-label={label}>
          {options.map(option => (
            <li key={option.value || "any"}>
              <button
                type="button"
                role="option"
                aria-selected={value === option.value}
                onClick={() => onChange(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function HeroDiscover() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [location, setLocation] = useState("Jersey City, NJ");
  const [deal, setDeal] = useState("buy");
  const [beds, setBeds] = useState("");
  const [type, setType] = useState("");
  const [openMenu, setOpenMenu] = useState<"deal" | "beds" | "type" | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!formRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (deal) params.set("deal", deal);
    if (location) params.set("q", location);
    if (beds) params.set("beds", beds);
    if (type) params.set("type", type);
    router.push(`/explore?${params.toString()}`);
  }

  return (
    <>
      <section className="mktHero">
        <img
          className="mktHeroBg"
          src="/images/poolset.webp"
          alt="Infinity pool overlooking the ocean at sunset"
        />
        <div className="mktHeroShade" />
        <div className="mktHeroInner">
          <div className="mktHeroCopy">
            <div className="mktEyebrow">Real Estate, Reimagined</div>
            <h1>More than a Home.<br /><span>A Brighter Tomorrow.</span></h1>
          </div>

          <div className="mktSearchRow">
            <form className="mktSearch" ref={formRef} onSubmit={onSubmit}>
              <FieldPick
                label="Buy"
                value={deal}
                options={dealOptions}
                open={openMenu === "deal"}
                onToggle={() => setOpenMenu(openMenu === "deal" ? null : "deal")}
                onClose={() => setOpenMenu(null)}
                onChange={value => {
                  setDeal(value);
                  setOpenMenu(null);
                }}
              />
              <label className="mktField">
                <MapPin size={15} />
                <PlacesLocation
                  value={location}
                  onChange={setLocation}
                  onFocus={() => setOpenMenu(null)}
                />
              </label>
              <FieldPick
                label="Bedrooms"
                value={beds}
                options={bedOptions}
                open={openMenu === "beds"}
                onToggle={() => setOpenMenu(openMenu === "beds" ? null : "beds")}
                onClose={() => setOpenMenu(null)}
                onChange={value => {
                  setBeds(value);
                  setOpenMenu(null);
                }}
              />
              <FieldPick
                label="Property Type"
                value={type}
                options={[
                  { value: "", label: "Property Type" },
                  ...types.map(item => ({ value: item.id, label: item.id }))
                ]}
                open={openMenu === "type"}
                onToggle={() => setOpenMenu(openMenu === "type" ? null : "type")}
                onClose={() => setOpenMenu(null)}
                onChange={value => {
                  setType(value);
                  setOpenMenu(null);
                }}
              />
              <button className="mktSearchBtn" type="submit">
                <Search size={14} /> Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="mktTypeRow">
        <span className="mktTypeLabel">Type</span>
        <div className="mktTypeTrack" role="tablist" aria-label="Property type">
          {types.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={type === item.id}
                className={type === item.id ? "active" : ""}
                onClick={() => setType(type === item.id ? "" : item.id)}
              >
                <Icon size={14} />
                <span>{item.id}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
