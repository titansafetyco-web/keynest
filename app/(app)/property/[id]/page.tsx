import { featuredListings, properties } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Maximize2, MapPin, Heart, Share2 } from "lucide-react";

export default async function PropertyPage({ params }: { params: Promise<{id:string}> }) {
  const { id } = await params;
  const featured = featuredListings.find(x => x.id === id);
  const listed = properties.find(x => x.id === id);
  const p = listed ?? (featured ? {
    ...featured,
    handle: `@${featured.agent.toLowerCase().replace(/\s+/g, "")}`
  } : undefined);
  if(!p) return notFound();
  return (
    <>
      <img src={p.image} alt={p.address} style={{width:"100%",maxHeight:560,objectFit:"cover",borderRadius:24,display:"block"}}/>
      <div className="grid2" style={{marginTop:18}}>
        <div className="card cardPad">
          <div className="row between">
            <div><div className="price">{p.price}</div><h2 style={{marginBottom:4}}>{p.address}</h2><div className="row muted"><MapPin size={15}/>{p.city}</div></div>
            <div className="row"><button className="btn"><Heart size={16}/></button><button className="btn"><Share2 size={16}/></button></div>
          </div>
          <div className="row muted" style={{gap:22,marginTop:18}}>
            <span className="row"><BedDouble size={17}/>{p.beds} beds</span>
            <span className="row"><Bath size={17}/>{p.baths} baths</span>
            <span className="row"><Maximize2 size={17}/>{p.sqft} sqft</span>
          </div>
          <h3>About this property</h3>
          <p className="muted" style={{lineHeight:1.7}}>A curated KeyNest listing experience with social discovery, creator attribution, agent messaging and campaign analytics built around a structured property object.</p>
        </div>
        <div className="card cardPad">
          <div className="row"><div className="avatar" style={{width:50,height:50}}/><div><strong>{p.agent}</strong><div className="muted small">{p.handle} · Verified Agent</div></div></div>
          <div style={{display:"grid",gap:10,marginTop:18}}>
            <button className="btn primary">Request a showing</button>
            <button className="btn">Message agent</button>
            <button className="btn">Follow agent</button>
          </div>
        </div>
      </div>
    </>
  )
}
