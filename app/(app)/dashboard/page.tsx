const leads = [
  ["Olivia Martin","88 Riverfront Ave","Showing request","New","Creator Reel"],
  ["Ethan Cole","214 Kent Avenue","Message","Contacted","KeyNest Boost"],
  ["Liam Davis","57 Hudson Street","Saved + inquiry","Qualified","Organic feed"],
  ["Sophia Grant","102 Bay Drive","Request info","Showing","Creator campaign"]
];

export default function DashboardPage() {
  return (
    <>
      <div className="sectionHead"><div><h2>Professional Dashboard</h2><p>Listings, leads, campaigns and performance.</p></div><button className="btn primary">Add listing</button></div>
      <div className="kpiGrid">
        {[["Active listings","18"],["New leads","42"],["Profile views","8,920"],["Ad spend","12.4K KP"]].map(x=>
          <div className="kpi" key={x[0]}><div className="muted tiny">{x[0]}</div><div className="value">{x[1]}</div></div>
        )}
      </div>
      <div className="sectionHead"><div><h2>Lead pipeline</h2><p>Attribution stays attached to every inquiry.</p></div></div>
      <div className="tableWrap">
        <table><thead><tr><th>Lead</th><th>Property</th><th>Intent</th><th>Stage</th><th>Source</th></tr></thead>
        <tbody>{leads.map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{i===0?<strong>{c}</strong>:c}</td>)}</tr>)}</tbody></table>
      </div>
      <div className="sectionHead"><div><h2>Campaign performance</h2></div></div>
      <div className="grid3">
        {[
          ["Riverfront Reel","18.4K impressions","431 saves"],
          ["Open House Weekend","11.2K impressions","92 profile visits"],
          ["Creator campaign","47.8K impressions","31 inquiries"]
        ].map(c=><div className="card cardPad" key={c[0]}><strong>{c[0]}</strong><p className="muted small">{c[1]}</p><p className="small">{c[2]}</p></div>)}
      </div>
    </>
  )
}
