"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export type DeviceName = "iphone" | "ipad" | "desktop";

export const DEVICE_STORAGE_KEY = "kn-device";
export const DEVICE_CHANGE_EVENT = "kn-device-change";

export function parseDevice(value: string | null): DeviceName {
  if (value === "iphone" || value === "ipad" || value === "desktop") return value;
  return "desktop";
}

export function setDeviceAttr(device: DeviceName) {
  document.documentElement.dataset.device = device;
}

export default function DeviceAttr() {
  const searchParams = useSearchParams();

  useEffect(() => {
    function apply() {
      if (window.self !== window.top) {
        setDeviceAttr(parseDevice(searchParams.get("knDevice")));
        return;
      }
      setDeviceAttr(parseDevice(window.localStorage.getItem(DEVICE_STORAGE_KEY)));
    }
    apply();
    window.addEventListener(DEVICE_CHANGE_EVENT, apply);
    return () => window.removeEventListener(DEVICE_CHANGE_EVENT, apply);
  }, [searchParams]);

  return null;
}
