import Link from "next/link";
import PropertyCard from "@/components/property-card";
import { properties, feedPosts } from "@/lib/mock-data";
import { Heart, MessageCircle, Bookmark, Send, TrendingUp, Users } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="heroText">
          <div className="eyebrow">The social network for real estate</div>
          <h1>Discover where life moves next.</h1>
          <p>Follow agents, creators, neighborhoods and properties. Turn real estate into something you can discover every day.</p>
          <div className="heroActions">
            <Link href="/explore" className="btn primary">Explore properties</Link>
            <Link href="/agents" className="btn ghostLight">Find people to follow</Link>
          </div>
        </div>
      </section>

      <div className="sectionHead">
        <div><h2>Featured for you</h2><p>Based on what you follow and save.</p></div>
        <Link className="link" href="/explore">View all</Link>
      </div>
      <div className="grid3">
        {properties.slice(0,3).map(p => <PropertyCard key={p.id} p={p}/>)}
      </div>

      <div className="sectionHead">
        <div><h2>Live feed</h2><p>Properties, creators and professionals you may like.</p></div>
      </div>

      <div className="feedLayout">
        <div style={{display:"grid", gap:18}}>
          {feedPosts.map(post => (
            <article key={post.id} className="card feedPost">
              <div className="postHead">
                <div className="avatar"/>
                <div>
                  <strong>{post.creator}</strong>
                  <div className="muted tiny">{post.handle} · 22m</div>
                </div>
                <button className="btn" style={{marginLeft:"auto"}}>Follow</button>
              </div>
              <img className="postMedia" src={post.property.image} alt="property"/>
              <div className="postActions">
                <span className="row"><Heart size={20}/>{post.likes}</span>
                <span className="row"><MessageCircle size={20}/>{post.comments}</span>
                <Send size={20}/>
                <span style={{marginLeft:"auto"}} className="row"><Bookmark size={20}/>{post.saves}</span>
              </div>
              <div className="postBody">
                <strong>{post.property.price} · {post.property.city}</strong>
                <p>{post.caption}</p>
                <Link className="link" href={`/property/${post.property.id}`}>View property</Link>
              </div>
            </article>
          ))}
        </div>

        <aside className="rightRail">
          <div className="stat"><TrendingUp size={18}/><strong>12.8K</strong><span className="muted small">Property views this week</span></div>
          <div className="stat"><Users size={18}/><strong>1,284</strong><span className="muted small">Active creators nearby</span></div>
          <div className="card cardPad">
            <strong>Trending</strong>
            <p className="small">#JerseyCityWaterfront</p>
            <p className="small">#NYCLofts</p>
            <p className="small">#Under1Million</p>
            <p className="small">#OpenHouseWeekend</p>
          </div>
        </aside>
      </div>
    </>
  );
}
