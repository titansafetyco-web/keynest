"use client";

import { useState } from "react";
import { knPostsByAgent, type KnAgent } from "@/lib/mock-data";
import { useSocial } from "./social-context";
import FeedPost from "./feed-post";
import VerifiedBadge from "./verified";

export default function AgentProfile({ agent, isYou }: { agent: KnAgent; isYou?: boolean }) {
  const social = useSocial();
  const posts = knPostsByAgent(agent.id);
  const [openId, setOpenId] = useState<string | null>(null);
  const following = !!social.followed[agent.id];
  const open = posts.find(p => p.id === openId);

  if (open) {
    return (
      <div>
        <div className="knSearchWrap">
          <button type="button" className="knCommentLink" onClick={() => setOpenId(null)}>
            Back to profile
          </button>
        </div>
        <FeedPost post={open} />
      </div>
    );
  }

  return (
    <>
      <div className="knProfileHead">
        <div className="knProfileRow">
          <img src={agent.image} alt="" />
          <div className="knStats">
            <div><strong>{posts.length || agent.postCount}</strong><span>posts</span></div>
            <div><strong>{agent.followers}</strong><span>followers</span></div>
            <div><strong>{agent.following}</strong><span>following</span></div>
          </div>
        </div>
        <h1>
          {agent.name}
          {agent.verified ? <VerifiedBadge /> : null}
        </h1>
        <p>{agent.city}</p>
        <p>{agent.bio}</p>
        {isYou ? null : (
          <button
            type="button"
            className={`knFollow${following ? " is-on" : ""}`}
            onClick={() => social.toggleFollow(agent.id)}
          >
            {following ? "Following" : "Follow"}
          </button>
        )}
      </div>
      {posts.length === 0 ? <p className="knEmpty">No posts yet.</p> : (
        <div className="knGrid">
          {posts.map(post => (
            <button type="button" key={post.id} onClick={() => setOpenId(post.id)} aria-label={post.address}>
              <img src={post.image} alt="" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
