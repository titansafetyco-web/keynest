"use client";

import { useEffect, useRef } from "react";
import { googleMapsKey, loadGoogleMapsPlaces } from "@/lib/google-maps";

export default function PlacesLocation({
  value,
  onChange,
  onFocus
}: {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!googleMapsKey()) return;
    const input = inputRef.current;
    if (!input) return;
    let cancelled = false;

    loadGoogleMapsPlaces()
      .then(() => {
        if (cancelled || !inputRef.current || !window.google?.maps?.places) return;
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["geocode"],
          fields: ["formatted_address", "name"]
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const text = place.formatted_address || place.name;
          if (text) onChangeRef.current(text);
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="City or neighborhood"
      aria-label="Location"
      autoComplete="off"
      onFocus={onFocus}
    />
  );
}
