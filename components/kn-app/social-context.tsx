"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { knActivity, knPosts, knViewer, type KnComment } from "@/lib/mock-data";

type Social = {
  liked: Record<string, boolean>;
  saved: Record<string, boolean>;
  followed: Record<string, boolean>;
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  toggleFollow: (agentId: string) => void;
  commentsFor: (postId: string) => KnComment[];
  addComment: (postId: string, text: string) => void;
  likeCount: (postId: string, base: number) => number;
  composeOpen: boolean;
  setComposeOpen: (open: boolean) => void;
  storyAgentId: string | null;
  openStory: (agentId: string) => void;
  closeStory: () => void;
  seenStories: Record<string, boolean>;
  markStorySeen: (agentId: string) => void;
  commentPostId: string | null;
  setCommentPostId: (id: string | null) => void;
  activityUnread: Record<string, boolean>;
  markActivityRead: (id: string) => void;
  hasUnreadActivity: boolean;
};

const SocialContext = createContext<Social | null>(null);

export function SocialProvider({ children }: { children: ReactNode }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [followed, setFollowed] = useState<Record<string, boolean>>({});
  const [extras, setExtras] = useState<Record<string, KnComment[]>>({});
  const [composeOpen, setComposeOpen] = useState(false);
  const [storyAgentId, setStoryAgentId] = useState<string | null>(null);
  const [seenStories, setSeenStories] = useState<Record<string, boolean>>({});
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [activityUnread, setActivityUnread] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(knActivity.map(n => [n.id, n.unread]))
  );

  const toggleLike = useCallback((id: string) => {
    setLiked(cur => ({ ...cur, [id]: !cur[id] }));
  }, []);
  const toggleSave = useCallback((id: string) => {
    setSaved(cur => ({ ...cur, [id]: !cur[id] }));
  }, []);
  const toggleFollow = useCallback((agentId: string) => {
    setFollowed(cur => ({ ...cur, [agentId]: !cur[agentId] }));
  }, []);
  const commentsFor = useCallback((postId: string) => {
    const post = knPosts.find(p => p.id === postId);
    return [...(post?.comments ?? []), ...(extras[postId] ?? [])];
  }, [extras]);
  const addComment = useCallback((postId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const next: KnComment = {
      id: `local-${Date.now()}`,
      name: knViewer.name,
      handle: knViewer.handle,
      avatar: knViewer.image,
      text: trimmed,
      time: "now"
    };
    setExtras(cur => ({ ...cur, [postId]: [...(cur[postId] ?? []), next] }));
  }, []);
  const likeCount = useCallback((postId: string, base: number) => base + (liked[postId] ? 1 : 0), [liked]);
  const openStory = useCallback((agentId: string) => setStoryAgentId(agentId), []);
  const closeStory = useCallback(() => setStoryAgentId(null), []);
  const markStorySeen = useCallback((agentId: string) => {
    setSeenStories(cur => (cur[agentId] ? cur : { ...cur, [agentId]: true }));
  }, []);
  const markActivityRead = useCallback((id: string) => {
    setActivityUnread(cur => (cur[id] === false ? cur : { ...cur, [id]: false }));
  }, []);
  const hasUnreadActivity = Object.values(activityUnread).some(Boolean);

  const value = useMemo(() => ({
    liked, saved, followed, toggleLike, toggleSave, toggleFollow,
    commentsFor, addComment, likeCount,
    composeOpen, setComposeOpen, storyAgentId, openStory, closeStory, seenStories, markStorySeen,
    commentPostId, setCommentPostId,
    activityUnread, markActivityRead, hasUnreadActivity
  }), [liked, saved, followed, toggleLike, toggleSave, toggleFollow, commentsFor, addComment, likeCount, composeOpen, storyAgentId, openStory, closeStory, seenStories, markStorySeen, commentPostId, activityUnread, markActivityRead, hasUnreadActivity]);

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

export function useSocial() {
  const ctx = useContext(SocialContext);
  if (!ctx) throw new Error("useSocial must be used inside SocialProvider");
  return ctx;
}
