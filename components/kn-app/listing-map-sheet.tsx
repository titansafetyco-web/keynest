"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { knMapPoint } from "@/lib/mock-data";
import HeroStreetMap from "@/components/marketing/hero-street-map";
import { useSocial } from "./social-context";
import { markPropSurface } from "@/lib/prop-nav";

export default function ListingMapSheet() {
  const router = useRouter();
  const social = useSocial();
  const post = social.mapPostId ? social.allPosts.find(item => item.id === social.mapPostId) : undefined;
  const listings = useMemo(() => {
    if (!post) return [];
    const origin = knMapPoint(post);
    const seen = new Set<string>();
    const nearby = [];
    for (const item of [post, ...social.allPosts]) {
      const point = knMapPoint(item);
      if (seen.has(point.propertyId)) continue;
      if (Math.hypot(point.lat - origin.lat, point.lng - origin.lng) > 0.4) continue;
      seen.add(point.propertyId);
      nearby.push({
        id: point.propertyId,
        price: item.price,
        lat: point.lat,
        lng: point.lng,
        address: item.address,
        city: item.city,
        beds: item.beds,
        baths: item.baths,
        sqft: item.sqft,
        image: item.image
      });
    }
    return nearby;
  }, [post, social.allPosts]);
  const originId = post ? knMapPoint(post).propertyId : "";
  const [selectedId, setSelectedId] = useState(originId);

  useEffect(() => {
    setSelectedId(originId);
  }, [originId]);

  if (!post) return null;
  const selected = listings.find(item => item.id === selectedId) ?? listings[0];

  return (
    <>
      <button type="button" className="knSheetScrim" aria-label="Close map" onClick={() => social.setMapPostId(null)} />
      <div className="knSheet knSheetMap" role="dialog" aria-label="Property map">
        <div className="knSheetHead">
          {post.address}
          <button type="button" className="knAppIconBtn" onClick={() => social.setMapPostId(null)}>Close</button>
        </div>
        <div className="knMapStage">
          <HeroStreetMap
            key={post.id}
            open
            listings={listings}
            activeId={selected?.id}
            onSelect={setSelectedId}
          />
          {selected ? (
            <button
              type="button"
              className="knMapCard"
              onClick={() => {
                markPropSurface("app");
                router.push(`/property/${selected.id}`);
              }}
            >
              <i className="knMapCardHandle" aria-hidden="true" />
              <img src={selected.image} alt="" />
              <span>
                <strong>{selected.price}</strong>
                <em>{selected.address}</em>
                <small>
                  {[
                    selected.beds ? `${selected.beds} bd` : "",
                    selected.baths ? `${selected.baths} ba` : "",
                    selected.sqft ? `${selected.sqft} sqft` : ""
                  ].filter(Boolean).join(" · ")}
                </small>
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
