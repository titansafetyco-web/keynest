"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Compass, PlaySquare, Users, MessageCircle, Bookmark,
  Megaphone, WalletCards, LayoutDashboard, Search, Bell, PlusSquare
} from "lucide-react";

const nav = [
  ["/home", "Home", Home],
  ["/explore", "Explore", Compass],
  ["/reels", "Reels", PlaySquare],
  ["/agents", "Agents", Users],
  ["/messages", "Messages", MessageCircle],
  ["/saved", "Saved", Bookmark],
  ["/boost", "Boost", Megaphone],
  ["/wallet", "KeyPoints", WalletCards],
  ["/dashboard", "Pro Dashboard", LayoutDashboard],
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="shell">
      <aside className="sidebar">
        <Link href="/home" className="logo">
          <span className="logoMark">K</span><span>KeyNest</span>
        </Link>
        <nav className="nav">
          {nav.map(([href, label, Icon]: any) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>
              <Icon size={17}/><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="sideCard">
          <strong>Grow on KeyNest</strong>
          <p>Post properties, build an audience and turn attention into opportunity.</p>
          <Link href="/create"><button>Create post</button></Link>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search"><Search size={17}/><input placeholder="Search properties, agents, creators, neighborhoods..." /></div>
          <button className="btn"><PlusSquare size={16}/></button>
          <button className="btn"><Bell size={16}/></button>
          <div className="avatar"/>
        </header>
        <div className="content">{children}</div>
      </main>

      <nav className="mobileNav">
        {nav.slice(0,5).map(([href,label,Icon]: any) => (
          <Link key={href} href={href}><Icon size={20}/><span>{label}</span></Link>
        ))}
      </nav>
    </div>
  );
}
