import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  HEADLIGHT_DURATION,
  HEADLIGHT_PRICE_LABEL,
  HOURS_DISPLAY,
  PACKAGES,
  PHONE_DISPLAY,
  PHONE_HREF,
  type ServiceId,
} from "@/lib/business";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "The Polished Piggy | Mobile Auto Detailing in Cincinnati" },
      {
        name: "description",
        content:
          `Mobile auto detailing in Greater Cincinnati. Full details ${PACKAGES.detailing.priceLabel}. We come to your driveway. Friendly help. Serious results.`,
      },
    ],
  }),
});

const MENU: ServiceId[] = ["detailing", "interior", "exterior"];

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
              Mobile auto detailing. We come to you.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              Full details, interiors, and exteriors in your driveway. Friendly
              help. Serious results.
            </p>
            <p className="mt-4 text-sm font-semibold text-fg">
              Full detail {PACKAGES.detailing.priceLabel}. Insured. Mon–Sat.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/book"
                search={{ service: "detailing" }}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-fg hover:bg-accent sm:w-auto"
              >
                Book a detail
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="/#packages"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-semibold text-fg hover:border-primary/40 sm:w-auto"
              >
                See packages
              </a>
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

      <section id="packages" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Packages
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide sm:text-4xl">
            Simple menu. Starting prices.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Prices below are for a typical sedan or daily driver. SUVs, trucks,
            and heavier interiors cost more. We confirm before we start. Pay when
            we get there.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {MENU.map((id) => {
              const pkg = PACKAGES[id];
              const featured = id === "detailing";
              return (
                <div
                  key={pkg.id}
                  className={`flex flex-col rounded-2xl border bg-surface p-6 ${
                    featured ? "border-primary/50" : "border-border"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {pkg.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide">
                    {pkg.name}
                  </h3>
                  <p className="mt-3 text-2xl font-semibold text-fg">
                    {pkg.priceLabel}
                  </p>
                  <p className="mt-1 text-sm text-muted">{pkg.duration}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {pkg.blurb}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/book"
                    search={{ service: pkg.id }}
                    className={`mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${
                      featured
                        ? "bg-primary text-primary-fg hover:bg-accent"
                        : "border border-border text-fg hover:border-primary/40"
                    }`}
                  >
                    Book {pkg.name.toLowerCase()}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <img
            src="/photos/before-after.jpg"
            alt="Before and after headlight restoration"
            className="w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Add-on · Also the ad offer
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide sm:text-4xl">
              Cloudy headlights? {HEADLIGHT_PRICE_LABEL} for the pair.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Matched and sealed in your driveway. Most visits take{" "}
              {HEADLIGHT_DURATION}. Book it alone or add it when we are already
              there for a detail.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/book"
                search={{ service: "headlights" }}
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-fg hover:bg-accent"
              >
                Book headlights
              </Link>
              <Link
                to="/headlights"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-fg hover:border-primary/40"
              >
                Headlights page
              </Link>
            </div>
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
