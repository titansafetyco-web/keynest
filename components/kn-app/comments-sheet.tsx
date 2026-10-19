"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { useSocial } from "./social-context";

export default function CommentsSheet() {
  const social = useSocial();
  const [draft, setDraft] = useState("");
  const post = social.commentPostId ? social.allPosts.find(item => item.id === social.commentPostId) : undefined;
  if (!social.commentPostId || !post) return null;
  const postId = post.id;
  const comments = social.commentsFor(postId);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    social.addComment(postId, draft);
    setDraft("");
  }

  return (
    <>
      <button type="button" className="knSheetScrim" aria-label="Close comments" onClick={() => social.setCommentPostId(null)} />
      <div className="knSheet" role="dialog" aria-label="Comments">
        <div className="knSheetHead">
          Comments
          <button type="button" className="knAppIconBtn" aria-label="Close" onClick={() => social.setCommentPostId(null)}>
            <X size={18} />
          </button>
        </div>
        <div className="knSheetList">
          {comments.length === 0 ? <p className="knEmpty">Be the first to comment.</p> : null}
          {comments.map(item => (
            <div className="knCommentRow" key={item.id}>
              <img src={item.avatar} alt="" />
              <div>
                <b>{item.handle}</b> {item.text}
                <time className="knPostTime">{item.time}</time>
              </div>
            </div>
          ))}
        </div>
        <form className="knSheetForm" onSubmit={onSubmit}>
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Add a comment…"
            aria-label="Comment"
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  );
}
