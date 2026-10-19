"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { knAgents, knPostsByAgent } from "@/lib/mock-data";
import { useSocial } from "./social-context";

export default function StoriesRail() {
  const social = useSocial();
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(dir: -1 | 1) {
    scroller.current?.scrollBy({ left: dir * 168, behavior: "smooth" });
  }

  return (
    <div className="knStoriesWrap">
      <button type="button" className="knStoriesArrow is-left" aria-label="Previous stories" onClick={() => scrollBy(-1)}>
        <ChevronLeft size={18} strokeWidth={2.4} />
      </button>
      <div className="knStories" ref={scroller}>
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
      <button type="button" className="knStoriesArrow is-right" aria-label="Next stories" onClick={() => scrollBy(1)}>
        <ChevronRight size={18} strokeWidth={2.4} />
      </button>
    </div>
  );
}
