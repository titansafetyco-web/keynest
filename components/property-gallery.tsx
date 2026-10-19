"use client";

import { useRef, useState } from "react";

export default function PropertyGallery({ images, alt }: { images: string[]; alt: string }) {
  const photos = images.filter(Boolean);
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  if (!photos.length) return null;

  function onScroll() {
    const el = trackRef.current;
    if (!el?.clientWidth) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <div className="propGallery">
      <div ref={trackRef} className="propGalleryTrack" onScroll={onScroll}>
        {photos.map((src, i) => (
          <img key={`${src}-${i}`} src={src} alt={`${alt}${photos.length > 1 ? ` ${i + 1}` : ""}`} />
        ))}
      </div>
      {photos.length > 1 ? <span className="propGalleryCount">{idx + 1}/{photos.length}</span> : null}
    </div>
  );
}
