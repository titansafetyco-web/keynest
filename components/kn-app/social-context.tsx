"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { knActivity, knAgents, knPostPhotos, knPosts, knViewer, type KnAgent, type KnComment, type KnPost } from "@/lib/mock-data";
import {
  deleteKeynestPost,
  loadKeynestFeed,
  saveKeynestComment,
  saveKeynestPost,
  saveKeynestProfile,
  updateKeynestPostImages
} from "@/lib/keynest";

export type KnStorySlide = {
  id: string;
  image: string;
  price?: string;
  address?: string;
  city?: string;
  time: string;
};

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
  allPosts: KnPost[];
  postsByAgent: (agentId: string) => KnPost[];
  viewer: KnAgent;
  agents: KnAgent[];
  agentById: (id: string) => KnAgent;
  updateAgent: (id: string, patch: Partial<KnAgent>) => void;
  addPost: (post: KnPost) => void;
  removePost: (id: string) => void;
  removePostImage: (id: string, image: string) => void;
  composeOpen: boolean;
  setComposeOpen: (open: boolean) => void;
  storyAgentId: string | null;
  openStory: (agentId: string) => void;
  closeStory: () => void;
  seenStories: Record<string, boolean>;
  markStorySeen: (agentId: string) => void;
  ownStories: KnStorySlide[];
  addOwnStories: (images: string[]) => void;
  storyQueue: KnAgent[];
  slidesFor: (agentId: string) => KnStorySlide[];
  commentPostId: string | null;
  setCommentPostId: (id: string | null) => void;
  mapPostId: string | null;
  setMapPostId: (id: string | null) => void;
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
  const [posts, setPosts] = useState<KnPost[]>(knPosts);
  const [agents, setAgents] = useState<KnAgent[]>(knAgents);
  const [viewer, setViewer] = useState<KnAgent>(knViewer);
  const [hiddenPosts, setHiddenPosts] = useState<Record<string, true>>({});
  const [postEdits, setPostEdits] = useState<Record<string, Pick<KnPost, "image" | "images">>>({});
  const [composeOpen, setComposeOpen] = useState(false);
  const [storyAgentId, setStoryAgentId] = useState<string | null>(null);
  const [seenStories, setSeenStories] = useState<Record<string, boolean>>({});
  const [ownStories, setOwnStories] = useState<KnStorySlide[]>([]);
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [mapPostId, setMapPostId] = useState<string | null>(null);
  const [activityUnread, setActivityUnread] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(knActivity.map(n => [n.id, n.unread]))
  );

  useEffect(() => {
    loadKeynestFeed().then(data => {
      setPosts(data.posts);
      setAgents(data.agents);
      setViewer(data.viewer);
    });
  }, []);

  const agentById = useCallback((id: string) => {
    if (id === viewer.id) return viewer;
    return agents.find(agent => agent.id === id) ?? viewer;
  }, [agents, viewer]);

  const updateAgent = useCallback((id: string, patch: Partial<KnAgent>) => {
    const apply = (agent: KnAgent) => agent.id === id ? { ...agent, ...patch } : agent;
    setAgents(cur => cur.map(apply));
    setViewer(cur => apply(cur));
    const next = apply(id === viewer.id ? viewer : agents.find(agent => agent.id === id) ?? viewer);
    void saveKeynestProfile(next).catch(() => {});
  }, [agents, viewer]);

  const toggleLike = useCallback((id: string) => {
    setLiked(cur => ({ ...cur, [id]: !cur[id] }));
  }, []);
  const toggleSave = useCallback((id: string) => {
    setSaved(cur => ({ ...cur, [id]: !cur[id] }));
  }, []);
  const toggleFollow = useCallback((agentId: string) => {
    setFollowed(cur => ({ ...cur, [agentId]: !cur[agentId] }));
  }, []);
  const allPosts = useMemo(
    () => posts
      .filter(post => !hiddenPosts[post.id])
      .map(post => (postEdits[post.id] ? { ...post, ...postEdits[post.id] } : post)),
    [posts, hiddenPosts, postEdits]
  );
  const postsByAgent = useCallback((agentId: string) => allPosts.filter(p => p.agentId === agentId), [allPosts]);
  const addPost = useCallback((post: KnPost) => {
    setPosts(cur => [post, ...cur]);
    void saveKeynestPost(post).catch(() => {});
  }, []);
  const removePost = useCallback((id: string) => {
    setHiddenPosts(cur => ({ ...cur, [id]: true }));
    setPosts(cur => cur.filter(post => post.id !== id));
    void deleteKeynestPost(id).catch(() => {});
  }, []);
  const removePostImage = useCallback((id: string, image: string) => {
    setPosts(cur => {
      const source = cur.find(post => post.id === id);
      if (!source) return cur;
      const next = knPostPhotos({ ...source, ...postEdits[id] }).filter(src => src !== image);
      if (!next.length) {
        setHiddenPosts(hidden => ({ ...hidden, [id]: true }));
        void deleteKeynestPost(id).catch(() => {});
        return cur.filter(post => post.id !== id);
      }
      setPostEdits(edits => ({ ...edits, [id]: { image: next[0], images: next } }));
      void updateKeynestPostImages(id, next).catch(() => {});
      return cur.map(post => post.id === id ? { ...post, image: next[0], images: next } : post);
    });
  }, [postEdits]);
  const commentsFor = useCallback((postId: string) => {
    const post = allPosts.find(p => p.id === postId);
    return [...(post?.comments ?? []), ...(extras[postId] ?? [])];
  }, [allPosts, extras]);
  const addComment = useCallback((postId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const next: KnComment = {
      id: `local-${Date.now()}`,
      name: viewer.name,
      handle: viewer.handle,
      avatar: viewer.image,
      text: trimmed,
      time: "now"
    };
    setExtras(cur => {
      const extra = [...(cur[postId] ?? []), next];
      const post = posts.find(item => item.id === postId);
      void saveKeynestComment(postId, [...(post?.comments ?? []), ...extra]).catch(() => {});
      return { ...cur, [postId]: extra };
    });
  }, [posts, viewer]);
  const likeCount = useCallback((postId: string, base: number) => base + (liked[postId] ? 1 : 0), [liked]);
  const addOwnStories = useCallback((images: string[]) => {
    const next = images.filter(Boolean).map((image, i) => ({
      id: `story-${Date.now()}-${i}`,
      image,
      time: "now"
    }));
    if (!next.length) return;
    setOwnStories(cur => [...next, ...cur]);
    setSeenStories(cur => ({ ...cur, [viewer.id]: false }));
  }, [viewer.id]);
  const slidesFor = useCallback((agentId: string): KnStorySlide[] => {
    if (agentId === viewer.id) return ownStories;
    return postsByAgent(agentId).map(post => ({
      id: post.id,
      image: post.image,
      price: post.price,
      address: post.address,
      city: post.city,
      time: post.time
    }));
  }, [ownStories, postsByAgent, viewer.id]);
  const storyQueue = useMemo(() => {
    const yours = ownStories.length ? [viewer] : [];
    const rest = agents.filter(agent => slidesFor(agent.id).length > 0);
    return [...yours, ...rest];
  }, [ownStories.length, slidesFor, viewer, agents]);
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
    viewer, agents, agentById, updateAgent,
    allPosts, postsByAgent, addPost, removePost, removePostImage,
    composeOpen, setComposeOpen, storyAgentId, openStory, closeStory, seenStories, markStorySeen,
    ownStories, addOwnStories, storyQueue, slidesFor,
    commentPostId, setCommentPostId,
    mapPostId, setMapPostId,
    activityUnread, markActivityRead, hasUnreadActivity
  }), [liked, saved, followed, toggleLike, toggleSave, toggleFollow, commentsFor, addComment, likeCount, viewer, agents, agentById, updateAgent, allPosts, postsByAgent, addPost, removePost, removePostImage, composeOpen, storyAgentId, openStory, closeStory, seenStories, markStorySeen, ownStories, addOwnStories, storyQueue, slidesFor, commentPostId, mapPostId, activityUnread, markActivityRead, hasUnreadActivity]);

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

export function useSocial() {
  const ctx = useContext(SocialContext);
  if (!ctx) throw new Error("useSocial must be used inside SocialProvider");
  return ctx;
}
