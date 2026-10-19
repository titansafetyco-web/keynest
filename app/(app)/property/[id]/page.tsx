import { loadListingById } from "@/lib/keynest";
import { knMarketLabel, listingCoords } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Maximize2, Heart, Share2 } from "lucide-react";
import PropertyGallery from "@/components/property-gallery";
import LoanEstimator from "@/components/loan-estimator";
import PropertyBack from "@/components/property-back";
import PropertyCityMap from "@/components/property-city-map";

export default async function PropertyPage({ params }: { params: Promise<{id:string}> }) {
  const { id } = await params;
  const p = await loadListingById(id);
  if(!p) return notFound();
  const coords = listingCoords(p.id, p.city, "lat" in p ? Number(p.lat) : undefined, "lng" in p ? Number(p.lng) : undefined);
  return (
    <article className="propPage">
      <PropertyBack />
      <PropertyGallery images={p.images?.length ? p.images : [p.image]} alt={p.address} />
      <div className="propLayout">
        <section className="card propMain">
          <div className="propMainScroll">
            <div className="propTop">
              <div className="propCopy">
                <div className="price">{p.price}</div>
                <h1 className="propAddress">{p.address}</h1>
                <PropertyCityMap
                  listing={{
                    id: p.id,
                    price: p.price,
                    lat: coords.lat,
                    lng: coords.lng,
                    address: p.address,
                    city: p.city,
                    beds: p.beds,
                    baths: p.baths,
                    sqft: p.sqft,
                    image: p.image
                  }}
                />
                <span className="propMarketTab">{knMarketLabel(p.daysOnMarket ?? 0)}</span>
              </div>
              <div className="propTools">
                <button className="btn propIconBtn" type="button" aria-label="Save"><Heart size={16}/></button>
                <button className="btn propIconBtn" type="button" aria-label="Share"><Share2 size={16}/></button>
              </div>
            </div>
            <div className="propFacts">
              <span><BedDouble size={16}/>{p.beds} beds</span>
              <span><Bath size={16}/>{p.baths} baths</span>
              <span><Maximize2 size={16}/>{p.sqft} sqft</span>
            </div>
            <h2 className="propAboutTitle">About this property</h2>
            <p className="muted propAbout">A curated KeyNest listing with social discovery, a verified agent, and a structured property record you can save, share, and tour.</p>
            <LoanEstimator priceLabel={p.price} />
          </div>
        </section>
        <aside className="card cardPad propAgent">
          <div className="propAgentHead">
            {p.agentImage ? (
              <img className="avatar" src={p.agentImage} alt="" />
            ) : (
              <div className="avatar" />
            )}
            <div>
              <strong>{p.agent}</strong>
              <div className="muted small">{p.handle} · Verified Agent</div>
            </div>
          </div>
          <div className="propAgentActions">
            <button className="btn primary" type="button">Request a showing</button>
            <button className="btn" type="button">Message agent</button>
            <button className="btn" type="button">Follow agent</button>
          </div>
        </aside>
      </div>
    </article>
  )
}
