import { Logo } from "@/components/logo";

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
      </div>
    </footer>
  );
}
