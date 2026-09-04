import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, MessageCircle, Phone } from "lucide-react";
import {
  HOURS_DISPLAY,
  PACKAGES,
  PHONE_DISPLAY,
  PHONE_HREF,
  SERVICE_IDS,
  SOCIALS,
  isServiceId,
  packageFor,
  type ServiceId,
} from "@/lib/business";

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>): { service?: ServiceId } => {
    if (isServiceId(search.service)) return { service: search.service };
    return {};
  },
  head: () => ({
    meta: [
      { title: "Start your quote | The Polished Piggy" },
      {
        name: "description",
        content:
          "Start a quote for mobile auto detailing in Greater Cincinnati. Book a time, call, or send a message.",
      },
    ],
  }),
  component: Quote,
});

function Quote() {
  const { service } = Route.useSearch();
  const selected = packageFor(service);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Start your quote
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
          How do you want to reach us?
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          Book a time now, call, or send a message. Same owner either way.
        </p>
        {selected ? (
          <p className="mt-3 text-sm font-semibold text-fg">
            {selected.name} · {selected.priceLabel}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-muted">
          {HOURS_DISPLAY}. Pay when we get there.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_IDS.map((id) => {
          const pkg = PACKAGES[id];
          const active = service === id;
          return (
            <Link
              key={id}
              to="/quote"
              search={{ service: id }}
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

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <Link
          to="/book"
          search={service ? { service } : undefined}
          className="rounded-2xl border border-primary/50 bg-surface p-6 hover:border-primary"
        >
          <div className="grid size-10 place-items-center rounded-full bg-primary text-primary-fg">
            <CalendarClock className="size-5" />
          </div>
          <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">
            Book a time now
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Pick a start time on the calendar. We text to confirm. Best if you
            already know what you want.
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
            Talk it through. Good if the car is extra dirty, you are not sure
            which package, or you want a same-day read.
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
            Send photos or a question on the app you already use. We will quote
            back.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
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
