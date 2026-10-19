"use client";

import { useRef } from "react";
import { useSocial } from "./social-context";

export default function StoriesRail() {
  const social = useSocial();
  const fileRef = useRef<HTMLInputElement>(null);
  const yours = social.slidesFor(social.viewer.id);

  function addStory() {
    fileRef.current?.click();
  }

  return (
    <div className="knStories">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="knComposeFile"
        aria-label="Add photos to your story"
        onChange={e => {
          const files = [...(e.target.files ?? [])].filter(file => file.type.startsWith("image/"));
          if (files.length) social.addOwnStories(files.map(file => URL.createObjectURL(file)));
          e.target.value = "";
        }}
      />
      <div className="knStory">
        <span className="knStoryAvatar">
          <button
            type="button"
            className={`knStoryRing${yours.length ? " has-story" : " is-seen"}`}
            aria-label="Your story"
            onClick={() => yours.length && social.openStory(social.viewer.id)}
          >
            <img src={social.viewer.image} alt="" />
          </button>
          <button
            type="button"
            className="knStoryAdd"
            aria-label="Add to your story"
            onClick={addStory}
          />
        </span>
        <span className="knStoryName">Your story</span>
      </div>
      {social.storyQueue.filter(agent => agent.id !== social.viewer.id).map(agent => {
        const latest = social.slidesFor(agent.id)[0];
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
            <span className="knStoryName">{agent.handle}</span>
          </button>
        );
      })}
    </div>
  );
}
