import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Logo from "./logo";

const columns = [
  {
    title: "Features",
    links: [
      ["/explore", "Explore"],
      ["/communities", "Communities"],
      ["/agents", "Agents"],
      ["/insights", "Market Insights"]
    ]
  },
  {
    title: "Resources",
    links: [
      ["/insights", "Blog"],
      ["/insights", "Help Center"],
      ["/pricing", "Pricing"],
      ["/insights", "Privacy"]
    ]
  },
  {
    title: "Company",
    links: [
      ["/communities", "About"],
      ["/pricing", "Careers"],
      ["/insights", "Press"],
      ["/login", "Contact"]
    ]
  },
  {
    title: "In The Loop",
    links: [
      ["/insights", "Latest listings"],
      ["/agents", "Agents"],
      ["/communities", "Neighborhoods"],
      ["/insights", "Topics"]
    ]
  }
] as const;

export default function SiteFooter() {
  return (
    <footer className="mktFooter">
      <div className="mktWrap">
        <div className="mktFooterTop">
          <div className="mktFooterBrand">
            <Logo />
            <p>Real estate, reimagined. Discover, share, invest, belong.</p>
            <div className="mktSocial">
              <a href="https://instagram.com" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="https://x.com" aria-label="X"><Twitter size={16} /></a>
            </div>
          </div>
          {columns.map(col => (
            <div key={col.title} className="mktFooterCol">
              <h4>{col.title}</h4>
              {col.links.map(([href, label]) => (
                <Link key={`${col.title}-${label}`} href={href}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mktFooterBottom">
          <span>© 2025 KeyNest. All rights reserved.</span>
          <strong>A GLOBAL COMMUNITY BUILT AROUND PEOPLE.</strong>
        </div>
      </div>
    </footer>
  );
}
