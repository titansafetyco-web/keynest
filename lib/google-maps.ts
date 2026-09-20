export type GooglePlaceAutocomplete = {
  addListener: (event: string, handler: () => void) => void;
  getPlace: () => { formatted_address?: string; name?: string };
};

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: { types?: string[]; fields?: string[] }
          ) => GooglePlaceAutocomplete;
        };
      };
    };
  }
}

export function googleMapsKey(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";
}

let loadPromise: Promise<void> | null = null;

export function loadGoogleMapsPlaces(): Promise<void> {
  const key = googleMapsKey();
  if (!key || typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-kn-maps]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Google Maps failed to load")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places`;
    script.async = true;
    script.dataset.knMaps = "1";
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}
