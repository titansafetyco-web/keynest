export const PROP_SURFACE_KEY = "kn-surface";
export const PROP_LAST_APP_KEY = "kn-last-app";
export const PROP_LAST_WEB_KEY = "kn-last-web";

export type PropSurface = "app" | "web";

export function markPropSurface(surface: PropSurface, path?: string) {
  try {
    sessionStorage.setItem(PROP_SURFACE_KEY, surface);
    if (surface === "app") {
      if (path) sessionStorage.setItem(PROP_LAST_APP_KEY, path);
      else if (!sessionStorage.getItem(PROP_LAST_APP_KEY)) sessionStorage.setItem(PROP_LAST_APP_KEY, "/app");
    } else if (path) {
      sessionStorage.setItem(PROP_LAST_WEB_KEY, path);
    } else if (!sessionStorage.getItem(PROP_LAST_WEB_KEY)) {
      sessionStorage.setItem(PROP_LAST_WEB_KEY, "/");
    }
  } catch {}
}

export function readPropSurface(): PropSurface | null {
  try {
    const value = sessionStorage.getItem(PROP_SURFACE_KEY);
    if (value === "app" || value === "web") return value;
  } catch {}
  return null;
}

export function lastAppPath() {
  try {
    return sessionStorage.getItem(PROP_LAST_APP_KEY) || "/app";
  } catch {
    return "/app";
  }
}

export function lastWebPath() {
  try {
    return sessionStorage.getItem(PROP_LAST_WEB_KEY) || "/";
  } catch {
    return "/";
  }
}
