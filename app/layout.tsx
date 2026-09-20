import "./globals.css";
import "./device-shell.css";
import "./device-ui.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import DeviceAttr from "@/components/dev/device-attr";
import DeviceShell from "@/components/dev/device-shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

const setPhoneBreakpoint = `
(function () {
  try {
    var query = window.matchMedia("(max-width: 820px)");
    function apply() {
      document.documentElement.setAttribute("data-bp", query.matches ? "phone" : "wide");
    }
    apply();
    if (query.addEventListener) query.addEventListener("change", apply);
    else if (query.addListener) query.addListener(apply);
  } catch (e) {}
})();
`;

const stripCursorRefs = `
(function () {
  function strip(node) {
    if (node && node.nodeType === 1 && node.removeAttribute) {
      node.removeAttribute("data-cursor-ref");
    }
  }
  function walk(root) {
    if (!root) return;
    strip(root);
    if (!root.querySelectorAll) return;
    var nodes = root.querySelectorAll("[data-cursor-ref]");
    for (var i = 0; i < nodes.length; i++) strip(nodes[i]);
  }
  walk(document.documentElement);
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      if (mutation.type === "attributes") strip(mutation.target);
      var added = mutation.addedNodes;
      if (!added) continue;
      for (var j = 0; j < added.length; j++) walk(added[j]);
    }
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["data-cursor-ref"]
  });
  window.addEventListener("load", function () {
    setTimeout(function () { observer.disconnect(); }, 2000);
  });
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const app = process.env.NODE_ENV === "development" ? (
    <Suspense fallback={children}>
      <DeviceAttr />
      <DeviceShell>{children}</DeviceShell>
    </Suspense>
  ) : (
    children
  );

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setPhoneBreakpoint }} />
        {process.env.NODE_ENV === "development" ? (
          <script dangerouslySetInnerHTML={{ __html: stripCursorRefs }} />
        ) : null}
      </head>
      <body suppressHydrationWarning>{app}</body>
    </html>
  );
}
