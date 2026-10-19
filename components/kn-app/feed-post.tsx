"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from "lucide-react";
import { knMarketTitle, knPostPhotos, type KnPost } from "@/lib/mock-data";
import { useSocial } from "./social-context";
import VerifiedBadge from "./verified";

function CaptionText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(@[A-Za-z0-9._]+)/g).map((chunk, i) =>
        /^@[A-Za-z0-9._]+$/.test(chunk) ? (
          <Link key={`${chunk}-${i}`} href={`/app/u/${chunk.slice(1)}`} className="knTagLink">
            {chunk}
          </Link>
        ) : (
          <span key={i}>{chunk}</span>
        )
      )}
    </>
  );
}

export default function FeedPost({ post }: { post: KnPost }) {
  const social = useSocial();
  const agent = social.agentById(post.agentId);
  const photos = knPostPhotos(post);
  const liked = !!social.liked[post.id];
  const saved = !!social.saved[post.id];
  const comments = social.commentsFor(post.id);
  const [idx, setIdx] = useState(0);
  const [menu, setMenu] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const yours = post.agentId === social.viewer.id;

  function onScroll() {
    const el = trackRef.current;
    if (!el?.clientWidth) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  }

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
        {yours ? (
          <div className="knPostMore">
            <button type="button" className="knAppIconBtn" aria-label="Post options" onClick={() => setMenu(open => !open)}>
              <Ellipsis size={20} />
            </button>
            {menu ? (
              <div className="knPostMenu" role="menu">
                <button type="button" role="menuitem" onClick={() => {
                  social.removePostImage(post.id, photos[idx] ?? photos[0]);
                  setMenu(false);
                  setIdx(0);
                }}>
                  Delete photo
                </button>
                <button type="button" role="menuitem" onClick={() => {
                  social.removePost(post.id);
                  setMenu(false);
                }}>
                  Delete post
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </header>
      <div className="knPostMedia">
        <div
          ref={trackRef}
          className="knPostTrack"
          onScroll={onScroll}
          onDoubleClick={() => social.toggleLike(post.id)}
        >
          {photos.map((src, i) => (
            <img
              key={`${src}-${i}`}
              className="knPostPhoto"
              src={src}
              alt={`${post.address}${photos.length > 1 ? ` ${i + 1}` : ""}`}
            />
          ))}
        </div>
        {photos.length > 1 ? <span className="knPostCount">{idx + 1}/{photos.length}</span> : null}
      </div>
      <div className="knPostActions">
        <div className="knPostActsL">
          <button type="button" className="knAppIconBtn" aria-label="Like" onClick={() => social.toggleLike(post.id)}>
            <Heart className={liked ? "knHeart on" : "knHeart"} size={24} fill={liked ? "currentColor" : "none"} />
          </button>
          <button type="button" className="knAppIconBtn" aria-label="Comments" onClick={() => social.setCommentPostId(post.id)}>
            <MessageCircle size={24} />
          </button>
          <button type="button" className="knAppIconBtn" aria-label="Share">
            <Send size={24} />
          </button>
        </div>
        {photos.length > 1 ? (
          <div className="knPostDots" aria-hidden>
            {photos.map((_, i) => (
              <i key={i} className={`knPostDot${i === idx ? " is-on" : ""}`} />
            ))}
          </div>
        ) : <span />}
        <button type="button" className="knAppIconBtn" aria-label="Save" onClick={() => social.toggleSave(post.id)}>
          <Bookmark className={saved ? "knSave on" : "knSave"} size={24} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="knPostMeta">
        <strong>{social.likeCount(post.id, post.likes).toLocaleString()} likes</strong>
        <p className="knPostMarket">{knMarketTitle(post)}</p>
        <p className="knPostCaption">
          <b>{agent.handle}</b> <CaptionText text={post.caption} />
        </p>
        <button type="button" className="knPostFacts" onClick={() => social.setMapPostId(post.id)}>
          {post.price} · {post.address} · {post.beds} bd · {post.baths} ba · {post.sqft} sqft
        </button>
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
