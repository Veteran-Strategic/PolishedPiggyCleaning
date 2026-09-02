declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = (
  import.meta.env.VITE_META_PIXEL_ID as string | undefined
)?.trim();

export function trackPixel(
  event: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}
