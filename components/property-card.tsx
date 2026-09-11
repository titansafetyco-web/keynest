import Link from "next/link";
import { Heart, BedDouble, Bath, Maximize2 } from "lucide-react";

export default function PropertyCard({ p }: { p:any }) {
  return (
    <Link href={`/property/${p.id}`} className="card">
      <img className="propertyImage" src={p.image} alt={p.address}/>
      <div className="propertyMeta">
        <div className="row between">
          <div className="price">{p.price}</div>
          <Heart size={18}/>
        </div>
        <div style={{fontWeight:700, marginTop:5}}>{p.address}</div>
        <div className="muted small">{p.city}</div>
        <div className="row muted tiny" style={{marginTop:12}}>
          <span className="row"><BedDouble size={14}/>{p.beds} bd</span>
          <span className="row"><Bath size={14}/>{p.baths} ba</span>
          <span className="row"><Maximize2 size={14}/>{p.sqft} sf</span>
        </div>
      </div>
    </Link>
  );
}
