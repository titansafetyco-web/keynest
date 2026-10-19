"use client";

import FeedPost from "@/components/kn-app/feed-post";
import StoriesRail from "@/components/kn-app/stories-rail";
import { knPosts } from "@/lib/mock-data";

export default function AppHomePage() {
  return (
    <>
      <StoriesRail />
      {knPosts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}
    </>
  );
}
