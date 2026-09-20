"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Factory,
  Gem,
  Home,
  MapPin,
  Search,
  Store,
  Building,
  Trees
} from "lucide-react";
import { featuredListings } from "@/lib/mock-data";
import HeroStreetMap from "@/components/marketing/hero-street-map";

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
  onChange
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  open: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  const selected = options.find(option => option.value === value);

  return (
    <div className="mktPick">
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
  const typeTrackRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState("Jersey City, NJ");
  const [deal, setDeal] = useState("buy");
  const [beds, setBeds] = useState("");
  const [type, setType] = useState("");
  const [openMenu, setOpenMenu] = useState<"deal" | "beds" | "type" | null>(null);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    function onDoc(e: PointerEvent) {
      const node = e.target;
      if (!(node instanceof Node)) return;
      if (formRef.current?.contains(node)) return;
      setOpenMenu(null);
    }
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  useEffect(() => {
    const node = typeTrackRef.current;
    if (!node) return;
    const track: HTMLDivElement = node;
    let active = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    function onDown(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      active = true;
      moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    }
    function onMove(e: PointerEvent) {
      if (!active) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6) moved = true;
      if (moved) track.scrollLeft = startScroll - dx;
    }
    function onUp(e: PointerEvent) {
      if (!active) return;
      active = false;
      if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    }
    function onClick(e: MouseEvent) {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    }

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    track.addEventListener("click", onClick, true);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      track.removeEventListener("click", onClick, true);
    };
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
      <section className={`mktHero${mapOpen ? " is-map" : ""}`}>
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

          <div className="mktHeroTools">
            <div className="mktSearchRow">
              <form className="mktSearch" ref={formRef} onSubmit={onSubmit}>
                <FieldPick
                  label="Buy"
                  value={deal}
                  options={dealOptions}
                  open={openMenu === "deal"}
                  onToggle={() => setOpenMenu(openMenu === "deal" ? null : "deal")}
                  onChange={value => {
                    setDeal(value);
                    setOpenMenu(null);
                  }}
                />
                <label className="mktField">
                  <MapPin size={15} />
                  <input
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="City or neighborhood"
                    aria-label="Location"
                    autoComplete="off"
                    onFocus={() => setOpenMenu(null)}
                  />
                </label>
                <FieldPick
                  label="Bedrooms"
                  value={beds}
                  options={bedOptions}
                  open={openMenu === "beds"}
                  onToggle={() => setOpenMenu(openMenu === "beds" ? null : "beds")}
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
                  onChange={value => {
                    setType(value);
                    setOpenMenu(null);
                  }}
                />
                <button className="mktSearchBtn" type="submit">
                  <Search size={14} /> <span>Search</span>
                </button>
              </form>
            </div>

            <button
              type="button"
              className="mktViewMap"
              onClick={() => {
                setOpenMenu(null);
                setMapOpen(true);
              }}
            >
              <span>View map</span>
              <i className="mktViewMapArrow" aria-hidden="true">
                <ChevronDown size={18} />
              </i>
            </button>
          </div>
        </div>

        <div className="mktHeroMap" aria-hidden={!mapOpen}>
          {mapOpen ? (
            <HeroStreetMap
              open={mapOpen}
              listings={featuredListings}
              onSelect={id => router.push(`/property/${id}`)}
            />
          ) : (
            <div className="mktHeroMapSurface" />
          )}
          <button
            type="button"
            className="mktMapClose"
            onClick={() => setMapOpen(false)}
          >
            <ChevronUp size={16} /> Close map
          </button>
        </div>
      </section>

      <div className="mktTypeRow">
        <span className="mktTypeLabel">Type</span>
        <div className="mktTypeTrack" ref={typeTrackRef} role="tablist" aria-label="Property type">
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
