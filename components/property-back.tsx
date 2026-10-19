"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { lastAppPath, lastWebPath, readPropSurface } from "@/lib/prop-nav";

function referrerWasApp() {
  try {
    if (!document.referrer) return false;
    const url = new URL(document.referrer);
    return url.origin === window.location.origin && url.pathname.startsWith("/app");
  } catch {
    return false;
  }
}

export default function PropertyBack() {
  const router = useRouter();

  function onBack() {
    const surface = readPropSurface();
    const fromApp = surface === "app" || referrerWasApp();
    if (fromApp) {
      router.push(lastAppPath());
      return;
    }
    if (surface === "web") {
      try {
        if (document.referrer) {
          const url = new URL(document.referrer);
          if (url.origin === window.location.origin && !url.pathname.startsWith("/app")) {
            router.back();
            return;
          }
        }
      } catch {}
      router.push(lastWebPath());
      return;
    }
    router.push("/");
  }

  return (
    <button type="button" className="propBack" onClick={onBack}>
      <ChevronLeft size={18} strokeWidth={2.2} />
      Back
    </button>
  );
}
