import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  HEADLIGHT_DURATION,
  HEADLIGHT_PRICE_LABEL,
  HOURS_DISPLAY,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/business";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "The Polished Piggy | Mobile Detailing & Headlights" },
      {
        name: "description",
        content:
          `Mobile auto detailing and headlight restoration in Greater Cincinnati. Both headlights ${HEADLIGHT_PRICE_LABEL}. We come to you. Friendly help. Serious results.`,
      },
    ],
  }),
});

function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Mobile · Greater Cincinnati · Veteran owned
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold uppercase leading-[1.08] tracking-wide text-fg sm:text-5xl lg:text-6xl">
              Mobile detailing. Crystal-clear headlights.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              We come to your driveway. Full auto detailing and headlight
              restoration. Friendly help. Serious results.
            </p>
            <p className="mt-4 text-sm font-semibold text-fg">
              Both headlights {HEADLIGHT_PRICE_LABEL}. Most visits take{" "}
              {HEADLIGHT_DURATION}. Insured.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/headlights"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-fg hover:bg-accent sm:w-auto"
              >
                Restore headlights
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/book"
                search={{ service: "detailing" }}
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-semibold text-fg hover:border-primary/40 sm:w-auto"
              >
                Book a detail
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted">
              <a href={PHONE_HREF} className="font-semibold text-fg hover:text-primary">
                {PHONE_DISPLAY}
              </a>
              {" · "}{HOURS_DISPLAY}
            </p>
          </div>
          <div className="relative">
            <img
              src="/photos/process.jpg"
              alt="Mobile detailing in a Greater Cincinnati driveway"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Link
          to="/headlights"
          className="group overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <img
            src="/photos/before-after.jpg"
            alt="Before and after headlight restoration"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Headlight restoration
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide">
              Cloudy to clear. {HEADLIGHT_PRICE_LABEL} a pair.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Both lights, matched, sealed, in your driveway. Most visits take{" "}
              {HEADLIGHT_DURATION}. This is the offer we run ads on.
            </p>
            <p className="mt-4 text-sm font-semibold text-primary group-hover:underline">
              See headlights →
            </p>
          </div>
        </Link>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <img
            src="/photos/dusk.jpg"
            alt="A detailed car at dusk"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Auto detailing
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide">
              The full clean. We come to you.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Wash, interior, and the work that makes a daily driver look cared
              for again. Tell us what the car needs when you book.
            </p>
            <Link
              to="/book"
              search={{ service: "detailing" }}
              className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Book a detail →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-14">
          <div className="w-full max-w-[320px] shrink-0 sm:max-w-[360px]">
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-black shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <video
                className="block aspect-[9/16] h-auto max-h-[70vh] w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
                poster="/videos/testimonial-poster.jpg"
              >
                <source src="/videos/testimonial.mp4" type="video/mp4" />
                Your browser can’t play this video.
              </video>
            </div>
          </div>
          <div className="w-full max-w-xl text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              From the neighborhood
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide sm:text-4xl">
              “I can’t recommend The Polished Piggy enough.”
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              A neighbor booked a full detail as a gift for a friend going
              through treatment. She said we showed up on time, took a real
              weight off both of them, and the van looked so clean you
              couldn’t tell the kids had been in it.
            </p>
            <p className="mt-4 text-sm text-muted">
              Two minutes. Her words. Hit play.
            </p>
            <Link
              to="/book"
              search={{ service: "detailing" }}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-fg hover:bg-accent"
            >
              Book a detail
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Jeremy · Owner
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide sm:text-4xl">
              Friendly help. Serious results.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              I’m Jeremy, a military veteran who landed in Greater Cincinnati
              by way of Florida and stayed because I love it here. I show up
              where you park. 100% veteran owned. Insured.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
