import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { MetaPixel } from "@/components/meta-pixel";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import appCss from "../styles.css?url";

const APP_NAME = "The Polished Piggy";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Mobile auto detailing in Greater Cincinnati. We come to your driveway. Full details, interiors, exteriors, and headlight restoration.",
      },
      { name: "theme-color", content: "#0B0B0D" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Outfit:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg">
        <PreviewHostBridge />
        <MetaPixel />
        <AuthProvider>
          <SiteHeader />
          <Outlet />
          <SiteFooter />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
