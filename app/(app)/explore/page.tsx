import PropertyCard from "@/components/property-card";
import { properties } from "@/lib/mock-data";

export default function ExplorePage() {
  return (
    <>
      <div className="sectionHead">
        <div><h2>Explore</h2><p>Discover properties, neighborhoods and collections.</p></div>
      </div>
      <div className="chips" style={{marginBottom:18}}>
        {["For You","Nearby","New","Luxury","Condos","Investment","Open Houses"].map((x,i)=>
          <span key={x} className={`chip ${i===0?"active":""}`}>{x}</span>
        )}
      </div>
      <div className="grid3">{properties.map(p => <PropertyCard key={p.id} p={p}/>)}</div>
    </>
  )
}
