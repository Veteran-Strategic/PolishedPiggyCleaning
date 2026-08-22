import { Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/components/logo";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/thepolishedpiggy",
    icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@polishedpiggydetailing",
    icon: Youtube,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@thepolishedpiggy",
    icon: TikTokIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61593426174066",
    icon: Facebook,
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Logo />
            <p className="font-display text-lg uppercase tracking-wide">
              The Polished Piggy
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Mobile headlight restoration in the Greater Cincinnati area. Crystal
            clear headlights, right where you park.
          </p>
          <p className="mt-3 text-sm font-semibold text-primary">
            100% veteran owned
          </p>
        </div>
        <div className="grid gap-1 text-sm text-muted">
          <p className="font-semibold text-fg">Service area</p>
          <p>Greater Cincinnati</p>
          <p>Mobile. We come to you.</p>
        </div>
        <div className="grid gap-1 text-sm text-muted">
          <p className="font-semibold text-fg">Crystal clear again</p>
          <p>Brighter nights. A car that looks cared for.</p>
        </div>
        <div className="grid gap-3 text-sm text-muted">
          <p className="font-semibold text-fg">Follow</p>
          <div className="flex flex-wrap items-center gap-1">
            {socials.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-border hover:text-primary"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
