import { WalletCards, ArrowDownToLine, Megaphone, Sparkles } from "lucide-react";

export default function WalletPage() {
  const tx = [
    ["Creator Reel bonus","+100 KP","Earned"],
    ["Qualified property views","+75 KP","Earned"],
    ["Quick Boost","-500 KP","Spent"],
    ["Invite verified member","+100 KP","Earned"]
  ];
  return (
    <>
      <div className="sectionHead"><div><h2>KeyPoints</h2><p>Your creator rewards and promotion credits.</p></div></div>
      <div className="grid3">
        <div className="card cardPad">
          <WalletCards/>
          <div className="muted small" style={{marginTop:14}}>Available balance</div>
          <div style={{fontSize:40,fontWeight:850,letterSpacing:"-.06em"}}>5,840 KP</div>
        </div>
        <div className="card cardPad">
          <Megaphone/>
          <div className="muted small" style={{marginTop:14}}>Promotion value</div>
          <div className="price">$87.60</div>
          <p className="small muted">Illustrative enhanced reinvestment value.</p>
        </div>
        <div className="card cardPad">
          <Sparkles/>
          <div className="muted small" style={{marginTop:14}}>Creator tier</div>
          <div className="price">Creator Pro</div>
          <p className="small muted">Next tier at 10,000 eligible KP.</p>
        </div>
      </div>
      <div className="sectionHead"><div><h2>Use your balance</h2></div></div>
      <div className="grid2">
        <div className="card cardPad">
          <h3>Reinvest</h3>
          <p className="muted small">Use KP for boosted distribution, premium analytics and creator tools.</p>
          <button className="btn primary">Open KeyNest Store</button>
        </div>
        <div className="card cardPad">
          <h3>Eligible cash out</h3>
          <p className="muted small">Requires eligibility, identity verification and applicable tax/compliance checks.</p>
          <button className="btn"><ArrowDownToLine size={15}/> Request review</button>
        </div>
      </div>
      <div className="sectionHead"><div><h2>Activity</h2></div></div>
      <div className="tableWrap"><table><thead><tr><th>Activity</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody>{tx.map(r=><tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table></div>
    </>
  )
}
