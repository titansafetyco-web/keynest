"use client";

import { useEffect, useState } from "react";
import {
  DEVICE_CHANGE_EVENT,
  DEVICE_STORAGE_KEY,
  parseDevice,
  setDeviceAttr,
  type DeviceName
} from "./device-attr";

type Device = DeviceName;

const stages: Record<Exclude<Device, "desktop">, { width: number; height: number; outerW: number; outerH: number }> = {
  iphone: { width: 390, height: 844, outerW: 420, outerH: 950 },
  ipad: { width: 820, height: 1024, outerW: 860, outerH: 1140 }
};

function StatusBar() {
  return (
    <div className="devStatusBar" aria-hidden="true">
      <span className="devTime">9:41</span>
      <span className="devIsland" />
      <span className="devStatusIcons">
        <i className="devSignal">
          <span /><span /><span /><span />
        </i>
        <span className="devLte">LTE</span>
        <i className="devBattery" />
      </span>
    </div>
  );
}

export default function DeviceShell({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<Device>("desktop");
  const [ready, setReady] = useState(false);
  const [nested, setNested] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setNested(window.self !== window.top);
    const saved = parseDevice(window.localStorage.getItem(DEVICE_STORAGE_KEY));
    setDevice(saved);
    if (window.self !== window.top) {
      setDeviceAttr(parseDevice(new URLSearchParams(window.location.search).get("knDevice")));
    } else {
      setDeviceAttr(saved);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || nested) return;
    window.localStorage.setItem(DEVICE_STORAGE_KEY, device);
    setDeviceAttr(device);
    window.dispatchEvent(new Event(DEVICE_CHANGE_EVENT));
  }, [device, ready, nested]);

  useEffect(() => {
    if (!ready || nested || device === "desktop") return;
    function fit() {
      if (device === "desktop") return;
      const stage = stages[device];
      const sx = (window.innerWidth - 48) / stage.outerW;
      const sy = (window.innerHeight - 120) / stage.outerH;
      setScale(Math.min(1, sx, sy));
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [device, ready, nested]);

  if (!ready || nested) return children;

  function select(next: Device) {
    setDevice(next);
  }

  return (
    <div className={`devShell devShell-${device}`}>
      {device === "desktop" ? (
        <div className="devDesktop">
          <div className="devWindowBar">
            <div className="devTraffic">
              <span />
              <span />
              <span />
            </div>
            <div className="devWindowTitle">KeyNest</div>
          </div>
          <div className="devDesktopBody">{children}</div>
        </div>
      ) : (
        <div
          className={`devDevice devDevice-${device}`}
          style={{
            width: stages[device].outerW * scale,
            height: stages[device].outerH * scale
          }}
        >
          <div
            className="devBezel"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left"
            }}
          >
            <StatusBar />
            <div
              className="devStage"
              style={{
                width: stages[device].width,
                height: stages[device].height
              }}
            >
              {children}
            </div>
            <div className="devHome" aria-hidden="true" />
          </div>
        </div>
      )}

      <div className="devPicker" role="tablist" aria-label="Device preview">
        {(["iphone", "ipad", "desktop"] as const).map(option => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={device === option}
            className={device === option ? "active" : ""}
            onClick={() => select(option)}
          >
            {option === "iphone" ? "iPhone" : option === "ipad" ? "iPad" : "Desktop"}
          </button>
        ))}
      </div>
    </div>
  );
}
