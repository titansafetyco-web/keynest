"use client";

import Link from "next/link";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { knAgentById, type KnPost } from "@/lib/mock-data";
import { useSocial } from "./social-context";
import VerifiedBadge from "./verified";

export default function FeedPost({ post }: { post: KnPost }) {
  const agent = knAgentById(post.agentId);
  const social = useSocial();
  const liked = !!social.liked[post.id];
  const saved = !!social.saved[post.id];
  const comments = social.commentsFor(post.id);

  return (
    <article className="knPost">
      <header className="knPostHead">
        <Link href={`/app/u/${agent.handle}`}>
          <img src={agent.image} alt="" />
          <span>
            <strong>
              {agent.name}
              {agent.verified ? <VerifiedBadge /> : null}
            </strong>
            <em>{post.city}</em>
          </span>
        </Link>
      </header>
      <button
        type="button"
        onDoubleClick={() => social.toggleLike(post.id)}
        style={{ display: "block", width: "100%", border: 0, padding: 0, background: "none" }}
        aria-label={`${post.address} photo`}
      >
        <img className="knPostPhoto" src={post.image} alt={post.address} />
      </button>
      <div className="knPostActions">
        <button type="button" className="knAppIconBtn" aria-label="Like" onClick={() => social.toggleLike(post.id)}>
          <Heart className={liked ? "knHeart on" : "knHeart"} size={24} fill={liked ? "currentColor" : "none"} />
        </button>
        <button type="button" className="knAppIconBtn" aria-label="Comments" onClick={() => social.setCommentPostId(post.id)}>
          <MessageCircle size={24} />
        </button>
        <button type="button" className="knAppIconBtn" aria-label="Share">
          <Send size={24} />
        </button>
        <button type="button" className="knAppIconBtn" aria-label="Save" onClick={() => social.toggleSave(post.id)}>
          <Bookmark className={saved ? "knSave on" : "knSave"} size={24} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="knPostMeta">
        <strong>{social.likeCount(post.id, post.likes).toLocaleString()} likes</strong>
        <p className="knPostCaption">
          <b>{agent.handle}</b> {post.caption}
        </p>
        <p className="knPostFacts">
          {post.price} · {post.address} · {post.beds} bd · {post.baths} ba · {post.sqft} sqft
        </p>
        {comments.length > 0 ? (
          <button type="button" className="knCommentLink" onClick={() => social.setCommentPostId(post.id)}>
            View all {comments.length} comments
          </button>
        ) : (
          <button type="button" className="knCommentLink" onClick={() => social.setCommentPostId(post.id)}>
            Add a comment…
          </button>
        )}
        <time className="knPostTime">{post.time} ago</time>
      </div>
    </article>
  );
}
