import PropertyCard from "@/components/property-card";
import { loadMarketingProperties } from "@/lib/keynest";

export default async function ExplorePage() {
  const list = await loadMarketingProperties();
  return (
    <>
      <div className="sectionHead">
        <div><h2>Explore</h2><p>Discover properties, neighborhoods and collections.</p></div>
      </div>
      <div className="chips exploreChips">
        {["For You","Nearby","New","Luxury","Condos","Investment","Open Houses"].map((x,i)=>
          <span key={x} className={`chip ${i===0?"active":""}`}>{x}</span>
        )}
      </div>
      <div className="grid3">{list.map(p => <PropertyCard key={p.id} p={p}/>)}</div>
    </>
  )
}
