"use client";

import { useEffect, useRef } from "react";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type MapListing = {
  id: string;
  price: string;
  lat: number;
  lng: number;
  address?: string;
  city?: string;
  beds?: number;
  baths?: number;
  sqft?: string;
  image?: string;
  badge?: string | null;
  agent?: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] ?? char
  ));
}

function pinCardHtml(listing: MapListing) {
  const facts = [
    listing.beds != null ? `${listing.beds} bd` : "",
    listing.baths != null ? `${listing.baths} ba` : "",
    listing.sqft ? `${escapeHtml(listing.sqft)} sqft` : ""
  ].filter(Boolean).join(" · ");
  const badge = listing.badge
    ? `<span class="mktMapPinBadge">${escapeHtml(listing.badge)}</span>`
    : "";
  const photo = listing.image
    ? `<img class="mktMapPinPhoto" src="${escapeHtml(listing.image)}" alt="">`
    : "";
  return `
    <span class="mktMapPinPrice">${shortPrice(listing.price)}</span>
    <i class="mktMapPinNeedle" aria-hidden="true"></i>
    <div class="mktMapPinCard">
      ${photo}
      <div class="mktMapPinCardBody">
        ${badge}
        <strong>${escapeHtml(listing.price)}</strong>
        <em>${escapeHtml([listing.address, listing.city].filter(Boolean).join(", "))}</em>
        ${facts ? `<small>${facts}</small>` : ""}
      </div>
    </div>
  `;
}

function keepCardInMap(pin: HTMLButtonElement) {
  const card = pin.querySelector<HTMLElement>(".mktMapPinCard");
  const map = pin.closest(".mktHeroMap");
  if (!card || !map) return;
  card.style.transform = "translateX(-50%)";
  const mapBox = map.getBoundingClientRect();
  const cardBox = card.getBoundingClientRect();
  const pad = 10;
  let shift = 0;
  if (cardBox.left < mapBox.left + pad) shift += mapBox.left + pad - cardBox.left;
  if (cardBox.right + shift > mapBox.right - pad) {
    shift += mapBox.right - pad - (cardBox.right + shift);
  }
  card.style.transform = `translateX(calc(-50% + ${shift}px))`;
}

function shortPrice(price: string) {
  const amount = Number(price.replace(/[^0-9]/g, ""));
  if (!amount) return price;
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `$${millions.toFixed(millions >= 10 ? 1 : 2).replace(/\.0+$/, "").replace(/(\.\d)0$/, "$1")}M`;
  }
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)}K`;
  return price;
}

function paintAppleLook(map: MapLibreMap) {
  const setPaint = (id: string, prop: string, value: unknown) => {
    if (!map.getLayer(id)) return;
    try {
      map.setPaintProperty(id, prop, value);
    } catch {
      /* layer may not support the paint property */
    }
  };
  const hide = (id: string) => {
    if (!map.getLayer(id)) return;
    try {
      map.setLayoutProperty(id, "visibility", "none");
    } catch {
      /* ignore */
    }
  };

  setPaint("background", "background-color", "#e7ece4");
  hide("natural_earth");
  setPaint("park", "fill-color", "#c8deb8");
  setPaint("park", "fill-opacity", 0.85);
  setPaint("park_outline", "line-color", "#b7d0a8");
  setPaint("landuse_residential", "fill-color", "#ece8e0");
  setPaint("landcover_wood", "fill-color", "#c3d9b2");
  setPaint("landcover_grass", "fill-color", "#d2e4c4");
  setPaint("landuse_pitch", "fill-color", "#cfe0bc");
  setPaint("landuse_cemetery", "fill-color", "#d5e3c9");
  setPaint("landuse_hospital", "fill-color", "#eadfd6");
  setPaint("landuse_school", "fill-color", "#e6e0d2");
  setPaint("water", "fill-color", "#9fc9d8");
  setPaint("waterway_river", "line-color", "#9fc9d8");
  setPaint("waterway_other", "line-color", "#9fc9d8");
  setPaint("building", "fill-color", "#ddd8cc");
  setPaint("building", "fill-opacity", 0.45);
  hide("building-3d");

  const casings = [
    "road_minor_casing",
    "road_secondary_tertiary_casing",
    "road_trunk_primary_casing",
    "road_motorway_casing",
    "road_link_casing",
    "road_service_track_casing",
    "road_motorway_link_casing",
    "bridge_street_casing",
    "bridge_secondary_tertiary_casing",
    "bridge_trunk_primary_casing",
    "bridge_motorway_casing",
    "tunnel_street_casing",
    "tunnel_secondary_tertiary_casing",
    "tunnel_trunk_primary_casing",
    "tunnel_motorway_casing"
  ];
  const streets = [
    "road_minor",
    "road_secondary_tertiary",
    "road_link",
    "road_service_track",
    "bridge_street",
    "bridge_secondary_tertiary",
    "bridge_link",
    "tunnel_minor",
    "tunnel_secondary_tertiary"
  ];
  const highways = [
    "road_trunk_primary",
    "road_motorway",
    "road_motorway_link",
    "bridge_trunk_primary",
    "bridge_motorway",
    "tunnel_trunk_primary",
    "tunnel_motorway"
  ];

  for (const id of casings) setPaint(id, "line-color", "#d8d3c9");
  for (const id of streets) setPaint(id, "line-color", "#ffffff");
  for (const id of highways) setPaint(id, "line-color", "#f4e2a6");

  hide("poi_r20");
  hide("poi_r7");
  hide("poi_r1");
  hide("poi_transit");
  hide("airport");
  hide("highway-shield-non-us");
  hide("highway-shield-us-interstate");
  hide("road_shield_us");
  hide("road_one_way_arrow");
  hide("road_one_way_arrow_opposite");

  for (const id of [
    "highway-name-path",
    "highway-name-minor",
    "highway-name-major",
    "label_other",
    "label_village",
    "label_town",
    "label_city",
    "water_name_point_label",
    "water_name_line_label"
  ]) {
    setPaint(id, "text-color", "#6a6a66");
    setPaint(id, "text-halo-color", "rgba(255,255,255,0.92)");
    setPaint(id, "text-halo-width", 1.2);
  }
}

export default function HeroStreetMap({
  open,
  listings,
  onSelect
}: {
  open: boolean;
  listings: MapListing[];
  onSelect: (id: string) => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!open) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
      return;
    }

    const el = elRef.current;
    if (!el || mapRef.current) return;

    let cancelled = false;
    let resize: ResizeObserver | null = null;

    void import("maplibre-gl").then(({ Map, Marker, LngLatBounds, setWorkerUrl }) => {
      if (cancelled || !elRef.current) return;
      setWorkerUrl("/maps/maplibre-gl-worker.mjs");

      const host = elRef.current;
      const start = () => {
        if (cancelled || !elRef.current) return;
        if (elRef.current.clientHeight < 48) {
          window.setTimeout(start, 50);
          return;
        }

        const map = new Map({
          container: elRef.current,
          style: "https://tiles.openfreemap.org/styles/liberty",
          center: [-74.0368, 40.7284],
          zoom: 13.15,
          minZoom: 11,
          maxZoom: 18,
          maxPitch: 0,
          attributionControl: false,
          fadeDuration: 0
        });

        map.scrollZoom.setWheelZoomRate(1 / 80);

        const placePins = () => {
          if (cancelled) return;
          paintAppleLook(map);
          markersRef.current.forEach(marker => marker.remove());
          markersRef.current = [];

          const bounds = new LngLatBounds();
          for (const listing of listings) {
            bounds.extend([listing.lng, listing.lat]);
            const pin = document.createElement("button");
            pin.type = "button";
            pin.className = "mktMapPin";
            pin.setAttribute("aria-label", `${listing.price} ${listing.address ?? ""}`.trim());
            pin.innerHTML = pinCardHtml(listing);
            pin.addEventListener("pointerenter", () => {
              pin.classList.add("is-open");
              pin.style.zIndex = "40";
              keepCardInMap(pin);
            });
            pin.addEventListener("pointerleave", () => {
              pin.classList.remove("is-open");
              pin.style.zIndex = "";
              const card = pin.querySelector<HTMLElement>(".mktMapPinCard");
              if (card) card.style.transform = "";
            });
            pin.addEventListener("click", event => {
              event.preventDefault();
              event.stopPropagation();
              onSelectRef.current(listing.id);
            });
            const marker = new Marker({ element: pin, anchor: "bottom", offset: [0, 2] })
              .setLngLat([listing.lng, listing.lat])
              .addTo(map);
            markersRef.current.push(marker);
          }

          if (listings.length) {
            map.fitBounds(bounds, { padding: 56, maxZoom: 14.4, duration: 0 });
          }
          map.resize();
        };

        map.on("load", placePins);
        map.on("error", () => {
          /* keep the empty surface rather than crashing the page */
        });

        mapRef.current = map;
        resize = new ResizeObserver(() => map.resize());
        resize.observe(host);
        window.setTimeout(() => map.resize(), 80);
        window.setTimeout(() => map.resize(), 600);
      };

      start();
    });

    return () => {
      cancelled = true;
      resize?.disconnect();
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [open, listings]);

  return <div className="mktHeroMapSurface" ref={elRef} />;
}
