"use client";

import FeedPost from "@/components/kn-app/feed-post";
import { useSocial } from "@/components/kn-app/social-context";
import { knAgents, knPosts, knPostsByAgent } from "@/lib/mock-data";

export default function AppHomePage() {
  const social = useSocial();

  return (
    <>
      <div className="knStories">
        {knAgents.map(agent => {
          const latest = knPostsByAgent(agent.id)[0];
          return (
            <button
              key={agent.id}
              type="button"
              className="knStory"
              onClick={() => latest && social.openStory(agent.id)}
            >
              <span className={`knStoryRing${social.seenStories[agent.id] ? " is-seen" : ""}`}>
                <img src={agent.image} alt="" />
              </span>
              <span>{agent.handle}</span>
            </button>
          );
        })}
      </div>
      {knPosts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}
    </>
  );
}
