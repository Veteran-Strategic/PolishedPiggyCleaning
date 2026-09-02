import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { META_PIXEL_ID, trackPixel } from "@/lib/meta-pixel";

function injectPixel(id: string) {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    window.fbq("init", id);
    return;
  }
  const fbq = ((...args: unknown[]) => {
    (fbq.queue = fbq.queue || []).push(args);
  }) as NonNullable<Window["fbq"]> & { queue: unknown[] };
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  window.fbq("init", id);
}

export function MetaPixel() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname + s.location.searchStr,
  });
  const ready = useRef(false);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    injectPixel(META_PIXEL_ID);
    ready.current = true;
  }, []);

  useEffect(() => {
    if (!META_PIXEL_ID || !ready.current) return;
    trackPixel("PageView");
  }, [pathname]);

  if (!META_PIXEL_ID) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
