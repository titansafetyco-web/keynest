"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        <button
          className="mktMenuBtn"
          type="button"
          aria-label={open ? "Close menu" : "Menu"}
          aria-expanded={open}
          aria-controls="mkt-mobile-nav"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <button
        type="button"
        className={`mktMobileScrim${open ? " is-open" : ""}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />
      <nav
        id="mkt-mobile-nav"
        className={`mktMobileNav${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mktMobileNavClip">
          <div className="mktMobileNavInner">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={pathname === href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="mktMobileNavActions">
              <Link href="/login" className="mktTextBtn" onClick={() => setOpen(false)}>
                Sign in
              </Link>
              <Link href="/signup" className="mktBtn" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
