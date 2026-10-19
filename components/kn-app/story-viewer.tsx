"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { knAgentById, knAgents, knPostsByAgent } from "@/lib/mock-data";
import { useSocial } from "./social-context";

const DURATION = 5000;

export default function StoryViewer() {
  const social = useSocial();
  const queue = knAgents.filter(agent => knPostsByAgent(agent.id).length > 0);
  const agentIdx = queue.findIndex(agent => agent.id === social.storyAgentId);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const downAt = useRef(0);

  useEffect(() => {
    setSlide(0);
    setProgress(0);
    progressRef.current = 0;
    setPaused(false);
  }, [social.storyAgentId]);

  const close = useCallback(() => social.closeStory(), [social]);

  const goNext = useCallback(() => {
    if (agentIdx < 0) return;
    const agent = queue[agentIdx];
    const slides = knPostsByAgent(agent.id);
    if (slide + 1 < slides.length) {
      setSlide(slide + 1);
      setProgress(0);
      progressRef.current = 0;
      return;
    }
    social.markStorySeen(agent.id);
    const nextAgent = queue[agentIdx + 1];
    if (!nextAgent) {
      close();
      return;
    }
    setSlide(0);
    setProgress(0);
    progressRef.current = 0;
    social.openStory(nextAgent.id);
  }, [agentIdx, close, queue, slide, social]);

  const goPrev = useCallback(() => {
    if (agentIdx < 0) return;
    if (slide > 0) {
      setSlide(slide - 1);
      setProgress(0);
      progressRef.current = 0;
      return;
    }
    const prevAgent = queue[agentIdx - 1];
    if (!prevAgent) {
      close();
      return;
    }
    const prevSlides = knPostsByAgent(prevAgent.id);
    setSlide(Math.max(0, prevSlides.length - 1));
    setProgress(0);
    progressRef.current = 0;
    social.openStory(prevAgent.id);
  }, [agentIdx, close, queue, slide, social]);

  useEffect(() => {
    if (agentIdx < 0 || paused) return;
    let raf = 0;
    const start = performance.now() - progressRef.current * DURATION;
    const tick = (now: number) => {
      const next = Math.min(1, (now - start) / DURATION);
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) {
        goNext();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [agentIdx, paused, slide, social.storyAgentId, goNext]);

  if (agentIdx < 0) return null;
  const agent = queue[agentIdx];
  const slides = knPostsByAgent(agent.id);
  const post = slides[slide];
  if (!post) return null;
  const owner = knAgentById(agent.id);

  function onDown() {
    downAt.current = Date.now();
    setPaused(true);
  }
  function onUp(dir: "prev" | "next") {
    setPaused(false);
    if (Date.now() - downAt.current < 280) {
      if (dir === "next") goNext();
      else goPrev();
    }
  }

  return (
    <div className="knStoryShow" role="dialog" aria-label={`${owner.name} story`}>
      <img className="knStoryPhoto" src={post.image} alt={post.address} />
      <div className="knStoryTicks" aria-hidden>
        {slides.map((item, i) => (
          <span key={item.id} className="knStoryTick">
            <i
              style={{
                width: i < slide ? "100%" : i === slide ? `${progress * 100}%` : "0%"
              }}
            />
          </span>
        ))}
      </div>
      <div className="knStoryShowBar">
        <Link href={`/app/u/${owner.handle}`} onClick={close}>
          <img src={owner.image} alt="" />
        </Link>
        <div>
          <strong>{owner.name}</strong>
          <div className="knPostTime" style={{ color: "rgba(255,255,255,.8)" }}>{post.time}</div>
        </div>
        <button type="button" className="knStoryClose" aria-label="Close story" onClick={close}>
          <X size={18} />
        </button>
      </div>
      <div className="knStoryHits">
        <button type="button" aria-label="Previous story" onPointerDown={onDown} onPointerUp={() => onUp("prev")} onPointerCancel={() => setPaused(false)} />
        <button type="button" aria-label="Next story" onPointerDown={onDown} onPointerUp={() => onUp("next")} onPointerCancel={() => setPaused(false)} />
      </div>
      <div className="knStoryShowCopy">
        <strong>{post.price}</strong>
        <span>{post.address}, {post.city}</span>
      </div>
    </div>
  );
}
