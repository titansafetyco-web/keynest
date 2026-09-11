import { feedPosts } from "@/lib/mock-data";
import { Heart, MessageCircle, Bookmark, Send } from "lucide-react";

export default function ReelsPage() {
  return (
    <>
      <div className="sectionHead"><div><h2>Reels</h2><p>Short-form property discovery.</p></div></div>
      <div style={{maxWidth:520, margin:"0 auto", display:"grid", gap:18}}>
        {feedPosts.map(post => (
          <div className="card" key={post.id} style={{position:"relative", overflow:"hidden"}}>
            <img src={post.property.image} style={{width:"100%", aspectRatio:"9/14", objectFit:"cover", display:"block"}}/>
            <div style={{position:"absolute", left:16, right:16, bottom:16, color:"#fff", textShadow:"0 2px 12px rgba(0,0,0,.45)"}}>
              <div className="row between">
                <div>
                  <strong>{post.property.price}</strong>
                  <div className="tiny">{post.property.city}</div>
                  <div className="small" style={{marginTop:8}}>{post.creator} · {post.handle}</div>
                </div>
                <div style={{display:"grid", gap:14}}>
                  <Heart/><MessageCircle/><Bookmark/><Send/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
