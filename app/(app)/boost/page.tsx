export default function BoostPage() {
  return (
    <>
      <div className="sectionHead"><div><h2>KeyNest Boost</h2><p>Promote eligible listings and content inside KeyNest.</p></div></div>
      <div className="grid2">
        <div className="card cardPad">
          <h3>Create campaign</h3>
          <div className="formGrid">
            <div className="field"><label>Asset</label><select><option>88 Riverfront Ave · Reel</option><option>Agent profile</option><option>Collection</option></select></div>
            <div className="field"><label>Objective</label><select><option>Property views</option><option>Saves</option><option>Profile visits</option><option>Messages</option></select></div>
            <div className="field"><label>Market</label><input defaultValue="Jersey City, NJ"/></div>
            <div className="field"><label>Duration</label><select><option>3 days</option><option>7 days</option><option>14 days</option></select></div>
            <div className="field"><label>Budget</label><input defaultValue="1500 KP"/></div>
            <div className="field"><label>Property context</label><select><option>Condos</option><option>Luxury</option><option>Investment</option><option>Open houses</option></select></div>
          </div>
          <button className="btn primary" style={{marginTop:16}}>Preview campaign</button>
        </div>
        <div className="card cardPad">
          <div className="muted small">Estimated reach</div><div style={{fontSize:42,fontWeight:850,letterSpacing:"-.06em"}}>8K–15K</div>
          <p className="muted small">Estimated KeyNest impressions. Actual delivery varies.</p>
          <hr style={{border:0,borderTop:"1px solid var(--border)",margin:"18px 0"}}/>
          <div className="row between"><span>Budget</span><strong>1,500 KP</strong></div>
          <div className="row between" style={{marginTop:10}}><span>Duration</span><strong>7 days</strong></div>
          <div className="row between" style={{marginTop:10}}><span>Goal</span><strong>Property views</strong></div>
        </div>
      </div>
    </>
  )
}
