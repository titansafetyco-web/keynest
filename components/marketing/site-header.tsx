"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./logo";

const links = [
  ["/", "Home"],
  ["/explore", "Explore"],
  ["/communities", "Communities"],
  ["/insights", "Market Insights"],
  ["/pricing", "Pricing"]
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="mktHeader">
      <div className="mktHeaderInner">
        <Logo />
        <nav className="mktNav">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="mktHeaderActions">
          <Link href="/login" className="mktTextBtn">Sign in</Link>
          <Link href="/signup" className="mktBtn">Get Started</Link>
        </div>
        <button className="mktMenuBtn" type="button" aria-label="Menu" onClick={() => setOpen(v => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="mktMobileNav">
          {links.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
          <Link href="/signup" className="mktBtn" onClick={() => setOpen(false)}>Get Started</Link>
        </div>
      )}
    </header>
  );
}
