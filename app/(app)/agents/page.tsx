import { creators } from "@/lib/mock-data";
import { BadgeCheck, MapPin } from "lucide-react";

export default function AgentsPage() {
  return (
    <>
      <div className="sectionHead"><div><h2>People</h2><p>Agents and creators shaping real estate discovery.</p></div></div>
      <div className="grid3">
        {creators.map(c => (
          <div className="card cardPad" key={c.handle}>
            <div className="row">
              <div className="avatar" style={{width:54,height:54}}/>
              <div>
                <strong className="row">{c.name}<BadgeCheck size={16}/></strong>
                <div className="muted small">{c.handle}</div>
              </div>
            </div>
            <p className="small row"><MapPin size={15}/>{c.focus}</p>
            <div className="row between">
              <div><strong>{c.followers}</strong><div className="muted tiny">followers</div></div>
              <div><strong>{c.score}</strong><div className="muted tiny">creator score</div></div>
              <button className="btn primary">Follow</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
