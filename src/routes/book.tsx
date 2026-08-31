import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import {
  detailsSchema,
  listWindowCounts,
  submitInquiry,
  type DetailsInput,
} from "@/lib/inquiries";
import {
  HEADLIGHT_DURATION,
  HEADLIGHT_PRICE_LABEL,
  HOURS_DISPLAY,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/business";
import {
  dayKey,
  formatAppointment,
  formatDayShort,
  openDays,
  slotsForDay,
} from "@/lib/schedule";

const SERVICES = ["headlights", "detailing"] as const;
type Service = (typeof SERVICES)[number];

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): { service?: Service } => {
    const raw = search.service;
    if (raw === "headlights" || raw === "detailing") return { service: raw };
    return {};
  },
  component: Book,
});

function Book() {
  const { service } = Route.useSearch();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [dayIso, setDayIso] = useState("");
  const [slotIso, setSlotIso] = useState<string | null>(null);
  const [doneAt, setDoneAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const days = useMemo(() => {
    return openDays().filter((day) =>
      slotsForDay(day, counts).some((slot) => !slot.full && !slot.past),
    );
  }, [counts]);

  const selectedDay = useMemo(
    () => days.find((d) => d.toISOString() === dayIso) ?? days[0],
    [days, dayIso],
  );
  const slots = useMemo(
    () => (selectedDay ? slotsForDay(selectedDay, counts) : []),
    [selectedDay, counts],
  );

  useEffect(() => {
    listWindowCounts()
      .then(setCounts)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!days.length) return;
    if (!days.some((d) => d.toISOString() === dayIso)) {
      setDayIso(days[0].toISOString());
      setSlotIso(null);
    }
  }, [days, dayIso]);

  useEffect(() => {
    if (slotIso && slots.some((s) => s.iso === slotIso && (s.full || s.past))) {
      setSlotIso(null);
    }
  }, [slotIso, slots]);

  const form = useForm<DetailsInput>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicle: "",
      neighborhood: "",
      notes: "",
    },
  });

  async function onSubmit(values: DetailsInput) {
    setError(null);
    if (!slotIso) {
      setError("Pick a day and a time first.");
      return;
    }
    const label =
      service === "headlights"
        ? `Service: Headlight restoration (${HEADLIGHT_PRICE_LABEL} both lights)`
        : service === "detailing"
          ? "Service: Auto detailing"
          : "";
    const notes = [label, values.notes].filter(Boolean).join("\n");
    try {
      const result = await submitInquiry({
        data: { ...values, notes, scheduledFor: slotIso },
      });
      setDoneAt(result.scheduledFor);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn’t hold that time. Try another.",
      );
      const next = await listWindowCounts().catch(() => ({} as Record<string, number>));
      setCounts(next);
    }
  }

  const eyebrow =
    service === "headlights"
      ? "Book headlight restoration"
      : service === "detailing"
        ? "Book a mobile detail"
        : "Book a mobile visit";

  const blurb =
    service === "headlights"
      ? `Both headlights ${HEADLIGHT_PRICE_LABEL}. Most visits take ${HEADLIGHT_DURATION}. You pick an hour so travel is covered. We’ll text to confirm. Payment holds the visit before we drive over.`
      : "You pick an hour. We’ll text to confirm. Payment holds the visit before we drive over.";

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
          Pick a time. We’ll come to you.
        </h1>
        <p className="mt-4 leading-relaxed text-muted">{blurb}</p>
        <p className="mt-3 text-sm text-muted">
          <a href={PHONE_HREF} className="font-semibold text-fg hover:text-primary">
            {PHONE_DISPLAY}
          </a>
          {" · "}{HOURS_DISPLAY}
        </p>
      </div>

      {service === "headlights" ? (
        <div className="mt-8 max-w-xl rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed">
          <p className="font-semibold text-fg">
            Headlight restoration · {HEADLIGHT_PRICE_LABEL} both lights
          </p>
          <p className="mt-2 text-muted">
            Matched and sealed in your driveway. Most visits take{" "}
            {HEADLIGHT_DURATION}. Insured. No charge on this screen — we take
            payment when we confirm, before we leave for your driveway. Weather
            cancels get moved, not billed.
          </p>
        </div>
      ) : null}

      {doneAt ? (
        <div className="mt-10 max-w-lg rounded-2xl border border-border bg-surface p-8">
          <div className="grid size-12 place-items-center rounded-full bg-primary text-primary-fg">
            <Check className="size-6" />
          </div>
          <h2 className="mt-5 font-display text-2xl uppercase tracking-wide">
            You’re on the calendar.
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            {formatAppointment(new Date(doneAt))}. Watch your phone. We’ll
            confirm and take payment before we head your way.
          </p>
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid min-w-0 gap-8 lg:grid-cols-2"
        >
          <section className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface p-4 sm:p-6">
            <h2 className="font-display text-lg uppercase tracking-wide">
              1. Choose a day
            </h2>
            <div className="day-scroller mt-4">
              {days.map((day) => {
                const meta = formatDayShort(day);
                const active = selectedDay ? dayKey(day) === dayKey(selectedDay) : false;
                return (
                  <button
                    key={meta.key}
                    type="button"
                    className="day-chip"
                    data-active={active}
                    onClick={() => {
                      setDayIso(day.toISOString());
                      setSlotIso(null);
                    }}
                  >
                    <span className="block text-xs uppercase tracking-wide">
                      {meta.weekday}
                    </span>
                    <span className="mt-0.5 block">{meta.monthDay}</span>
                  </button>
                );
              })}
            </div>

            <h2 className="mt-8 font-display text-lg uppercase tracking-wide">
              2. Choose a time
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {slots.map((slot) => (
                <button
                  key={slot.iso}
                  type="button"
                  className="time-chip"
                  data-active={slotIso === slot.iso}
                  disabled={slot.full || slot.past}
                  onClick={() => setSlotIso(slot.iso)}
                >
                  {slot.full ? "Booked" : slot.label}
                </button>
              ))}
            </div>
            {slots.every((s) => s.full || s.past) ? (
              <p className="mt-3 text-sm text-muted">
                No times left this day. Try another.
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted">
                Monday–Saturday, 9:00 AM–6:00 PM. Each booking holds the full
                hour. Closed Sundays. Eastern time.
              </p>
            )}
          </section>

          <section className="min-w-0 space-y-4 rounded-2xl border border-border bg-surface p-4 sm:p-6">
            <h2 className="font-display text-lg uppercase tracking-wide">
              3. Your details
            </h2>
            {slotIso ? (
              <p className="text-sm text-primary">
                {formatAppointment(new Date(slotIso))}
              </p>
            ) : (
              <p className="text-sm text-muted">Pick a day and time first.</p>
            )}
            <Field label="Name" error={form.formState.errors.name?.message}>
              <input className="input" autoComplete="name" {...form.register("name")} />
            </Field>
            <Field label="Phone" error={form.formState.errors.phone?.message}>
              <input
                className="input"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                {...form.register("phone")}
              />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <input
                className="input"
                type="email"
                inputMode="email"
                autoComplete="email"
                {...form.register("email")}
              />
            </Field>
            <Field label="Vehicle (year / make / model)">
              <input className="input" {...form.register("vehicle")} />
            </Field>
            <Field
              label="City or neighborhood"
              error={form.formState.errors.neighborhood?.message}
            >
              <input className="input" {...form.register("neighborhood")} />
            </Field>
            {error ? <p className="text-sm text-primary">{error}</p> : null}
            <button
              type="submit"
              disabled={form.formState.isSubmitting || !slotIso}
              className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-fg hover:bg-accent disabled:opacity-60"
            >
              {form.formState.isSubmitting ? "Holding…" : "Hold this time"}
            </button>
            <p className="text-xs leading-relaxed text-muted">
              {service === "headlights"
                ? `${HEADLIGHT_PRICE_LABEL} both lights. No charge on this screen. We take payment when we confirm, before we leave for your driveway.`
                : "No charge on this screen. We take payment when we confirm, before we leave for your driveway."}
            </p>
          </section>
        </form>
      )}
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1 text-xs text-primary">{error}</p> : null}
    </label>
  );
}
