import { Link } from "@tanstack/react-router";
import { SignedIn, UserButton } from "@/lib/auth/gates";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-fg md:flex">
          <Link to="/headlights" className="hover:text-primary">
            Headlights
          </Link>
          <Link to="/book" className="hover:text-primary">
            Book
          </Link>
        </nav>
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <SignedIn>
            <Link
              to="/inbox"
              className="hidden text-sm text-muted hover:text-fg lg:inline"
            >
              Inbox
            </Link>
            <UserButton />
          </SignedIn>
          <Link
            to="/book"
            search={{ service: "headlights" }}
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-primary px-3.5 text-sm font-semibold text-primary-fg hover:bg-accent sm:px-4"
          >
            Book a visit
          </Link>
        </div>
      </div>
    </header>
  );
}
