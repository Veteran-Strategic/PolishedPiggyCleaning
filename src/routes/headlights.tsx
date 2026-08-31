import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, ShieldCheck } from "lucide-react";
import {
  HEADLIGHT_DURATION,
  HEADLIGHT_PRICE_LABEL,
  HOURS_DISPLAY,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/business";

export const Route = createFileRoute("/headlights")({
  component: Headlights,
  head: () => ({
    meta: [
      { title: "Headlight Restoration | The Polished Piggy" },
      {
        name: "description",
        content:
          `Mobile headlight restoration in Greater Cincinnati. Both headlights ${HEADLIGHT_PRICE_LABEL}, ${HEADLIGHT_DURATION}, right in your driveway.`,
      },
    ],
  }),
});

function Headlights() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Mobile · Greater Cincinnati · {HEADLIGHT_PRICE_LABEL} a pair
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold uppercase leading-[1.08] tracking-wide text-fg sm:text-5xl lg:text-6xl">
              Cloudy headlights? We’ll make them clear again.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              We restore yellowed, hazy headlights right in your driveway.
              Brighter at night. A car that looks cared for again.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/book"
                search={{ service: "headlights" }}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-fg hover:bg-accent sm:w-auto"
              >
                Schedule a visit
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-semibold text-fg hover:border-primary/40 sm:w-auto"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <p className="mt-5 text-sm text-muted">
              {HEADLIGHT_PRICE_LABEL} for both lights. Most visits take{" "}
              {HEADLIGHT_DURATION}. {HOURS_DISPLAY}.
            </p>
          </div>
          <div className="relative">
            <img
              src="/photos/hero.jpg"
              alt="Crystal-clear restored headlight on a dark SUV"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <Fact
            icon={<MapPin className="size-5" />}
            title="Right in your driveway"
            body="No drop-off. No shop wait. We come to you across Greater Cincinnati."
          />
          <Fact
            icon={<Clock className="size-5" />}
            title={`Most visits take ${HEADLIGHT_DURATION}`}
            body="You can stay home or head out. We just need the car and a parking spot."
          />
          <Fact
            icon={<ShieldCheck className="size-5" />}
            title={`${HEADLIGHT_PRICE_LABEL} a pair. Insured.`}
            body="Both headlights, matched and sealed. Veteran owned."
          />
        </div>
      </section>

      <section id="results" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src="/photos/before-after.jpg"
            alt="Yellowed, cloudy headlight next to a restored crystal-clear lens"
            className="w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Headlight restoration
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide sm:text-4xl">
              Dull and yellowed is normal. It’s also fixable.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Sun and weather cloud the plastic over time. That haze doesn’t
              just look tired. It cuts how far you can see after dark. We bring
              the clarity back and seal it so it lasts.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                `${HEADLIGHT_PRICE_LABEL} for both headlights`,
                `Most visits take ${HEADLIGHT_DURATION}`,
                "We come to your house. Insured.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/book"
              search={{ service: "headlights" }}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-fg hover:bg-accent sm:w-auto"
            >
              Get your headlights restored
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Jeremy · Owner
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide sm:text-4xl">
              Friendly help. Serious results.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              I’m Jeremy, a military veteran and Florida transplant who loves
              Cincinnati. I show up where you park, keep things straightforward,
              and aim for results you can actually see.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Fact({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-bg text-primary">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}
