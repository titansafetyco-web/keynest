"use client";

import FeedPost from "@/components/kn-app/feed-post";
import StoriesRail from "@/components/kn-app/stories-rail";
import { useSocial } from "@/components/kn-app/social-context";

export default function AppHomePage() {
  const social = useSocial();
  return (
    <>
      <StoriesRail />
      {social.allPosts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}
    </>
  );
}
