"use client";

import { useMemo, useState } from "react";
import FeedPost from "@/components/kn-app/feed-post";
import { useSocial } from "@/components/kn-app/social-context";

export default function AppExplorePage() {
  const social = useSocial();
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return social.allPosts;
    return social.allPosts.filter(post => {
      const agent = social.agentById(post.agentId);
      return [post.address, post.city, post.price, post.caption, agent.name, agent.handle]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [q, social.allPosts, social.agentById]);
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
          <div className="knGridItem" key={post.id}>
            <button type="button" onClick={() => setOpenId(post.id)} aria-label={post.address}>
              <img src={post.image} alt="" />
            </button>
            {post.agentId === social.viewer.id ? (
              <button
                type="button"
                className="knGridDelete"
                aria-label="Delete post"
                onClick={() => social.removePost(post.id)}
              >
                Delete
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
