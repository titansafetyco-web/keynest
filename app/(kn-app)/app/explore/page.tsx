"use client";

import { useMemo, useState } from "react";
import { knAgentById, knPosts } from "@/lib/mock-data";
import FeedPost from "@/components/kn-app/feed-post";

export default function AppExplorePage() {
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return knPosts;
    return knPosts.filter(post => {
      const agent = knAgentById(post.agentId);
      return [post.address, post.city, post.price, post.caption, agent.name, agent.handle]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [q]);
  const open = filtered.find(p => p.id === openId);

  if (open) {
    return (
      <div>
        <div className="knSearchWrap">
          <button type="button" className="knCommentLink" onClick={() => setOpenId(null)}>
            Back to grid
          </button>
        </div>
        <FeedPost post={open} />
      </div>
    );
  }

  return (
    <>
      <div className="knSearchWrap">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search listings and agents"
          aria-label="Search"
        />
      </div>
      {filtered.length === 0 ? <p className="knEmpty">No listings match.</p> : null}
      <div className="knGrid">
        {filtered.map(post => (
          <button type="button" key={post.id} onClick={() => setOpenId(post.id)} aria-label={post.address}>
            <img src={post.image} alt="" />
          </button>
        ))}
      </div>
    </>
  );
}
