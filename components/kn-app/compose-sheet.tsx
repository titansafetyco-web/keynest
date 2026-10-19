"use client";

import { type DragEvent, type FormEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { type KnPost } from "@/lib/mock-data";
import { useSocial } from "./social-context";

const US_STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"]
] as const;

const empty = {
  caption: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  sqft: "",
  beds: "",
  baths: "",
  price: ""
};

export default function ComposeSheet() {
  const social = useSocial();
  const fileRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState(empty);
  const [photos, setPhotos] = useState<string[]>([]);
  const [posted, setPosted] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const dragFromRef = useRef<number | null>(null);
  dragFromRef.current = dragFrom;

  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => {
    return () => {
      photosRef.current.forEach(src => {
        if (src.startsWith("blob:")) URL.revokeObjectURL(src);
      });
    };
  }, []);

  useEffect(() => {
    if (!social.composeOpen) setStateOpen(false);
  }, [social.composeOpen]);

  useEffect(() => {
    if (!stateOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!stateRef.current?.contains(e.target as Node)) setStateOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    const selected = menuRef.current?.querySelector<HTMLElement>("[aria-selected='true']");
    selected?.scrollIntoView({ block: "nearest" });
    return () => document.removeEventListener("mousedown", onDoc);
  }, [stateOpen]);

  if (!social.composeOpen) return null;

  function set<K extends keyof typeof empty>(key: K, value: string) {
    setFields(cur => ({ ...cur, [key]: value }));
  }

  function onFiles(list: FileList | null) {
    const next = [...(list ?? [])].filter(file => file.type.startsWith("image/")).map(file => URL.createObjectURL(file));
    if (!next.length) return;
    setPhotos(cur => [...cur, ...next]);
  }

  function movePhoto(from: number, to: number) {
    if (from === to || from < 0 || to < 0) return;
    setPhotos(cur => {
      if (from >= cur.length || to >= cur.length) return cur;
      const next = [...cur];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  function onThumbPointerDown(e: PointerEvent<HTMLSpanElement>, index: number) {
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragFrom(index);
  }

  function onThumbsPointerMove(e: PointerEvent<HTMLSpanElement>) {
    const from = dragFromRef.current;
    if (from == null) return;
    const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-thumb]");
    if (!hit) return;
    const to = Number((hit as HTMLElement).dataset.thumb);
    if (!Number.isFinite(to) || to === from) return;
    movePhoto(from, to);
    setDragFrom(to);
  }

  function onDropFiles(e: DragEvent) {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  }

  function removePhoto(index: number) {
    setPhotos(cur => {
      const src = cur[index];
      if (src?.startsWith("blob:")) URL.revokeObjectURL(src);
      return cur.filter((_, i) => i !== index);
    });
  }

  function maskNumber(raw: string, max = 12) {
    const digits = raw.replace(/[^\d]/g, "").replace(/^0+(?=\d)/, "").slice(0, max);
    if (!digits) return "";
    return Number(digits).toLocaleString("en-US");
  }

  function maskPrice(raw: string) {
    const n = maskNumber(raw);
    return n ? `$${n}` : "";
  }

  function formatPrice(raw: string) {
    const masked = maskPrice(raw);
    return masked || "Price upon request";
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!photos.length) return;
    const post: KnPost = {
      id: `local-${Date.now()}`,
      agentId: social.viewer.id,
      listingId: `listing-${Date.now()}`,
      image: photos[0],
      images: photos,
      price: formatPrice(fields.price),
      address: fields.address.trim() || "Address coming soon",
      city: [fields.city.trim(), [fields.state, fields.zip.trim()].filter(Boolean).join(" ")].filter(Boolean).join(", ") || social.viewer.city,
      beds: Number(fields.beds) || 0,
      baths: Number(fields.baths) || 0,
      sqft: fields.sqft.trim() || "—",
      caption: fields.caption.trim() || "Just listed.",
      likes: 0,
      time: "now",
      comments: []
    };
    social.addPost(post);
    setPosted(true);
    window.setTimeout(() => {
      setPosted(false);
      setFields(empty);
      setPhotos([]);
      social.setComposeOpen(false);
    }, 700);
  }

  return (
    <>
      <button type="button" className="knSheetScrim" aria-label="Close compose" onClick={() => social.setComposeOpen(false)} />
      <div className="knSheet knSheetCompose" role="dialog" aria-label="New listing">
        <div className="knSheetHead">
          New listing
          <button type="button" className="knAppIconBtn" onClick={() => social.setComposeOpen(false)}>Close</button>
        </div>
        <form className="knCompose" onSubmit={onSubmit}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="knComposeFile"
            aria-label="Photos from camera roll"
            multiple
            onChange={e => {
              onFiles(e.target.files);
              e.target.value = "";
            }}
          />
          {photos.length === 0 ? (
            <button
              type="button"
              className="knComposePhoto"
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={onDropFiles}
            >
              <ImagePlus size={22} />
              <span>Add photos from camera roll</span>
            </button>
          ) : (
            <div
              className="knComposeThumbs"
              onDragOver={e => e.preventDefault()}
              onDrop={onDropFiles}
            >
              {photos.map((src, i) => (
                <span
                  key={src}
                  data-thumb={i}
                  className={`knComposeThumb${dragFrom === i ? " is-drag" : ""}`}
                  onPointerDown={e => onThumbPointerDown(e, i)}
                  onPointerMove={onThumbsPointerMove}
                  onPointerUp={() => setDragFrom(null)}
                  onPointerCancel={() => setDragFrom(null)}
                >
                  <img src={src} alt={`Photo ${i + 1}`} draggable={false} />
                  <button type="button" aria-label="Delete photo" onClick={() => removePhoto(i)}>
                    <X size={12} strokeWidth={3} />
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="knComposeAddMore"
                onClick={() => fileRef.current?.click()}
              >
                <ImagePlus size={18} />
                <span>Add</span>
              </button>
            </div>
          )}
          <input
            value={fields.address}
            onChange={e => set("address", e.target.value)}
            placeholder="Address"
            aria-label="Address"
            autoComplete="street-address"
          />
          <div className="knComposePlace">
            <input
              value={fields.city}
              onChange={e => set("city", e.target.value)}
              placeholder="City"
              aria-label="City"
              autoComplete="address-level2"
            />
            <div className="knComposeStateWrap" ref={stateRef}>
              <button
                type="button"
                className={`knComposeState${fields.state ? "" : " is-placeholder"}`}
                aria-label="State"
                aria-haspopup="listbox"
                aria-expanded={stateOpen}
                onClick={() => setStateOpen(open => !open)}
              >
                {fields.state || "State"}
              </button>
              {stateOpen ? (
                <div className="knComposeStateMenu" ref={menuRef} role="listbox" aria-label="State">
                  {US_STATES.map(([abbr, name]) => (
                    <button
                      key={abbr}
                      type="button"
                      role="option"
                      aria-label={name}
                      aria-selected={fields.state === abbr}
                      className={fields.state === abbr ? "is-on" : undefined}
                      onClick={() => {
                        set("state", abbr);
                        setStateOpen(false);
                      }}
                    >
                      {abbr}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <input
              value={fields.zip}
              onChange={e => set("zip", e.target.value.replace(/[^\d-]/g, "").slice(0, 10))}
              placeholder="ZIP"
              aria-label="ZIP code"
              inputMode="numeric"
              autoComplete="postal-code"
            />
          </div>
          <div className="knComposeGrid">
            <input
              value={fields.price}
              onChange={e => set("price", maskPrice(e.target.value))}
              placeholder="$"
              inputMode="numeric"
              aria-label="Price"
            />
            <input
              value={fields.sqft}
              onChange={e => set("sqft", maskNumber(e.target.value, 7))}
              placeholder="Sqft"
              inputMode="numeric"
              aria-label="Square feet"
            />
            <input
              value={fields.beds}
              onChange={e => set("beds", e.target.value)}
              placeholder="Bedrooms"
              inputMode="decimal"
              aria-label="Bedrooms"
            />
            <input
              value={fields.baths}
              onChange={e => set("baths", e.target.value)}
              placeholder="Bathrooms"
              inputMode="decimal"
              aria-label="Bathrooms"
            />
          </div>
          <textarea
            value={fields.caption}
            onChange={e => set("caption", e.target.value)}
            placeholder="Write a caption…"
            aria-label="Caption"
          />
          <button type="submit" disabled={!photos.length}>{posted ? "Shared" : "Share"}</button>
        </form>
      </div>
    </>
  );
}
