"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import HeroStreetMap from "@/components/marketing/hero-street-map";

type ListingPin = {
  id: string;
  price: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  beds: number;
  baths: number;
  sqft: string;
  image?: string;
};

export default function PropertyCityMap({ listing }: { listing: ListingPin }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="row muted propCity" onClick={() => setOpen(true)}>
        <MapPin size={15} />
        {listing.city}
      </button>
      {open ? (
        <div className="propMapOverlay">
          <button type="button" className="propMapScrim" aria-label="Close map" onClick={() => setOpen(false)} />
          <div className="propMapPanel" role="dialog" aria-label={`${listing.address} map`}>
            <div className="propMapHead">
              <span>{listing.address}</span>
              <button type="button" className="btn" onClick={() => setOpen(false)}>Close</button>
            </div>
            <div className="propMapStage">
              <HeroStreetMap open listings={[listing]} activeId={listing.id} onSelect={() => {}} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
