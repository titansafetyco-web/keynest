"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import { Heart, Home, PlusSquare, Search, Send } from "lucide-react";
import Logo from "@/components/marketing/logo";
import { knViewer } from "@/lib/mock-data";
import { useSocial } from "./social-context";
import CommentsSheet from "./comments-sheet";
import StoryViewer from "./story-viewer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const social = useSocial();
  const [draft, setDraft] = useState("");
  const [posted, setPosted] = useState(false);

  function onCompose(e: FormEvent) {
    e.preventDefault();
    setPosted(true);
    window.setTimeout(() => {
      setPosted(false);
      setDraft("");
      social.setComposeOpen(false);
    }, 900);
  }

  return (
    <div className="knAppRoot">
      <div className="knAppFrame">
        <div className="knAppShell">
          <header className="knAppTop">
            {pathname.startsWith("/app/activity") ? (
              <h1 className="knAppTitle">Activity</h1>
            ) : (
              <Logo href="/" />
            )}
            <div className="knAppTopActions">
              <Link
                href="/app/activity"
                className={`knAppIconBtn${pathname.startsWith("/app/activity") ? " is-on" : ""}`}
                aria-label="Activity"
              >
                <Heart
                  size={22}
                  className={!pathname.startsWith("/app/activity") && social.hasUnreadActivity ? "knHeart on" : undefined}
                  fill={pathname.startsWith("/app/activity") || social.hasUnreadActivity ? "currentColor" : "none"}
                />
              </Link>
              <Link href="/app/messages" className="knAppIconBtn" aria-label="Messages">
                <Send size={22} />
              </Link>
            </div>
          </header>
          <main className="knAppMain">{children}</main>
          <nav className="knAppTabs" aria-label="App">
            <Link href="/app" className={`knAppTab${pathname === "/app" ? " is-on" : ""}`} aria-label="Home">
              <Home size={24} strokeWidth={pathname === "/app" ? 2.4 : 1.8} />
            </Link>
            <Link href="/app/explore" className={`knAppTab${pathname.startsWith("/app/explore") ? " is-on" : ""}`} aria-label="Search">
              <Search size={24} strokeWidth={pathname.startsWith("/app/explore") ? 2.4 : 1.8} />
            </Link>
            <button type="button" className="knAppTab" aria-label="New post" onClick={() => social.setComposeOpen(true)}>
              <PlusSquare size={24} />
            </button>
            <Link href="/app/messages" className={`knAppTab${pathname.startsWith("/app/messages") ? " is-on" : ""}`} aria-label="Messages">
              <Send size={22} strokeWidth={pathname.startsWith("/app/messages") ? 2.4 : 1.8} />
            </Link>
            <Link href="/app/me" className={`knAppTab${pathname === "/app/me" ? " is-on" : ""}`} aria-label="Profile">
              <img className="knAppTabAvatar" src={knViewer.image} alt="" />
            </Link>
          </nav>
          <CommentsSheet />
          <StoryViewer />
          {social.composeOpen ? (
            <>
              <button type="button" className="knSheetScrim" aria-label="Close compose" onClick={() => social.setComposeOpen(false)} />
              <div className="knSheet" role="dialog" aria-label="New post">
                <div className="knSheetHead">
                  New post
                  <button type="button" className="knAppIconBtn" onClick={() => social.setComposeOpen(false)}>Close</button>
                </div>
                <form className="knCompose" onSubmit={onCompose}>
                  <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Write a caption for a listing…"
                    aria-label="Caption"
                  />
                  <button type="submit">{posted ? "Shared" : "Share"}</button>
                </form>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
