import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, MessageCircle, Phone } from "lucide-react";
import {
  ADDONS,
  HOURS_DISPLAY,
  PACKAGES,
  PHONE_DISPLAY,
  PHONE_HREF,
  SERVICE_IDS,
  SIZE_IDS,
  SIZES,
  SOCIALS,
  addonsParam,
  availableAddons,
  money,
  needsSize,
  parseAddons,
  parseQuoteSearch,
  quoteReady,
  quoteSummary,
  quoteTotal,
  servicePrice,
  type AddonId,
  type QuoteSearch,
} from "@/lib/business";

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>): QuoteSearch =>
    parseQuoteSearch(search),
  head: () => ({
    meta: [
      { title: "Start your quote | The Polished Piggy" },
      {
        name: "description",
        content:
          "Start a quote for mobile auto detailing in Greater Cincinnati. Pick a service, vehicle size, and add-ons.",
      },
    ],
  }),
  component: Quote,
});

function Quote() {
  const search = Route.useSearch();
  const { service, size } = search;
  const addons = parseAddons(search.addons).filter((id) =>
    availableAddons(service).includes(id),
  );
  const total = quoteTotal(service, size, addons);
  const ready = quoteReady(service, size);
  const addonOptions = availableAddons(service);

  function withQuote(next: QuoteSearch): QuoteSearch {
    const merged: QuoteSearch = { ...search, ...next };
    if (merged.service === "headlights") {
      delete merged.size;
      delete merged.addons;
    } else if (next.service && next.service !== search.service) {
      const allowed = availableAddons(next.service);
      merged.addons = addonsParam(addons.filter((id) => allowed.includes(id)));
    }
    if (!merged.addons) delete merged.addons;
    return merged;
  }

  function toggleAddon(id: AddonId): QuoteSearch {
    const next = addons.includes(id)
      ? addons.filter((item) => item !== id)
      : [...addons, id];
    return withQuote({ addons: addonsParam(next) });
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Start your quote
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
          Build the visit. Then pick how to reach us.
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          Service first. Vehicle size next so the price is honest. Add-ons at
          the end. Starting prices — condition can change it.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-lg uppercase tracking-wide">1. Service</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_IDS.map((id) => {
            const pkg = PACKAGES[id];
            const active = service === id;
            return (
              <Link
                key={id}
                to="/quote"
                search={withQuote({ service: id })}
                className="rounded-2xl border px-4 py-4 text-left"
                style={{
                  borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                  background: active ? "var(--color-surface)" : "transparent",
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {pkg.eyebrow}
                </p>
                <p className="mt-1 font-semibold text-fg">{pkg.name}</p>
                <p className="mt-1 text-sm text-muted">{pkg.priceLabel}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {needsSize(service) ? (
        <section className="mt-10">
          <h2 className="font-display text-lg uppercase tracking-wide">
            2. Vehicle size
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {SIZE_IDS.map((id) => {
              const item = SIZES[id];
              const active = size === id;
              const price = service ? servicePrice(service, id) : null;
              return (
                <Link
                  key={id}
                  to="/quote"
                  search={withQuote({ size: id })}
                  className="rounded-2xl border px-4 py-4 text-left"
                  style={{
                    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                    background: active ? "var(--color-surface)" : "transparent",
                  }}
                >
                  <p className="font-semibold text-fg">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.hint}</p>
                  {price != null ? (
                    <p className="mt-2 text-sm font-semibold text-primary">
                      {money(price)}
                    </p>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {service === "headlights" ? (
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
          Headlight restoration stays {PACKAGES.headlights.priceLabel} on every
          vehicle. Size does not change it.
        </p>
      ) : null}

      {addonOptions.length && size ? (
        <section className="mt-10">
          <h2 className="font-display text-lg uppercase tracking-wide">
            3. Add-ons
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Optional. Headlights are a good add if the lenses are cloudy.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {addonOptions.map((id) => {
              const item = ADDONS[id];
              const active = addons.includes(id);
              const addonPrice = item.prices[size];
              return (
                <Link
                  key={id}
                  to="/quote"
                  search={toggleAddon(id)}
                  className="rounded-2xl border px-4 py-4 text-left"
                  style={{
                    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                    background: active ? "var(--color-surface)" : "transparent",
                  }}
                >
                  <p className="font-semibold text-fg">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.blurb}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">
                    {active ? "Added · " : ""}
                    {money(addonPrice)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-10 max-w-xl rounded-2xl border border-border bg-surface p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Estimate
        </p>
        <p className="mt-2 font-semibold text-fg">
          {ready && total != null
            ? `${quoteSummary(service, size, addons)}`
            : "Pick a service" +
              (needsSize(service) ? " and a vehicle size." : ".")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Starting price. Extra dirt, pet hair, or heavy correction can change
          it. We confirm before we start. Pay when we get there.
        </p>
      </section>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <Link
          to="/book"
          search={search}
          className="rounded-2xl border border-primary/50 bg-surface p-6 hover:border-primary"
        >
          <div className="grid size-10 place-items-center rounded-full bg-primary text-primary-fg">
            <CalendarClock className="size-5" />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">
            Book a time now
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Hold a start time. We text to confirm the window and the price.
          </p>
          <p className="mt-5 text-sm font-semibold text-primary">Open the calendar →</p>
        </Link>

        <a
          href={PHONE_HREF}
          className="rounded-2xl border border-border bg-surface p-6 hover:border-primary/40"
        >
          <div className="grid size-10 place-items-center rounded-full bg-bg text-primary">
            <Phone className="size-5" />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">
            Call
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Faster if the car is extra dirty or you want a same-day read.
          </p>
          <p className="mt-5 text-sm font-semibold text-primary">{PHONE_DISPLAY}</p>
        </a>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="grid size-10 place-items-center rounded-full bg-bg text-primary">
            <MessageCircle className="size-5" />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">
            Message us
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Send photos. We quote back on the app you already use.
          </p>
          <p className="mt-3 text-xs text-muted">{HOURS_DISPLAY}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SOCIALS.filter((s) => s.name !== "YouTube").map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-fg hover:text-primary"
                >
                  {social.name} · {social.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
