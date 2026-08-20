import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import {
  inquirySchema,
  submitInquiry,
  type InquiryInput,
} from "@/lib/inquiries";

export const Route = createFileRoute("/book")({ component: Book });

function Book() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicle: "",
      neighborhood: "",
      notes: "",
    },
  });

  async function onSubmit(values: InquiryInput) {
    setError(null);
    try {
      await submitInquiry({ data: values });
      setDone(true);
    } catch {
      setError("Couldn’t send that just now. Try again in a minute.");
    }
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Book a mobile visit
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
          We’ll come to your driveway.
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          Share a few details and we’ll confirm a time. Most headlight
          restorations take about 15 minutes.
        </p>
        <img
          src="/photos/dusk.jpg"
          alt="Restored headlight glowing at dusk"
          className="mt-8 hidden rounded-2xl object-cover lg:block"
        />
      </div>

      {done ? (
        <div className="rounded-2xl border border-border bg-surface p-8">
          <div className="grid size-12 place-items-center rounded-full bg-primary text-primary-fg">
            <Check className="size-6" />
          </div>
          <h2 className="mt-5 font-display text-2xl uppercase tracking-wide">
            Got it.
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            We’ll reach out to lock a time. Keep an eye on your phone.
          </p>
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-border bg-surface p-6 sm:p-8"
        >
          <Field label="Name" error={form.formState.errors.name?.message}>
            <input
              className="input"
              autoComplete="name"
              {...form.register("name")}
            />
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
          <Field label="City or neighborhood">
            <input className="input" {...form.register("neighborhood")} />
          </Field>
          <Field label="Anything we should know?">
            <textarea
              className="input min-h-24"
              rows={3}
              {...form.register("notes")}
            />
          </Field>
          {error ? <p className="text-sm text-primary">{error}</p> : null}
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-fg hover:bg-accent disabled:opacity-60"
          >
            {form.formState.isSubmitting ? "Sending…" : "Schedule a visit"}
          </button>
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
