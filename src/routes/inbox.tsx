import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listInquiries, type InquiryRow } from "@/lib/inquiries";

export const Route = createFileRoute("/inbox")({ component: Inbox });

function Inbox() {
  const { user, isPending } = useCurrentUserState();
  const [rows, setRows] = useState<InquiryRow[] | null>(null);

  useEffect(() => {
    if (!user) return;
    listInquiries()
      .then(setRows)
      .catch(() => setRows([]));
  }, [user]);

  if (isPending) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="h-8 w-40 animate-pulse rounded bg-border" />
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-medium">Booking inbox</h1>
      <p className="mt-2 text-sm text-muted">
        New driveway requests land here.
      </p>
      <div className="mt-8 space-y-4">
        {rows === null ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-surface p-8 text-sm text-muted">
            No inquiries yet. The book form on the site feeds this list.
          </p>
        ) : (
          rows.map((row) => (
            <article
              key={row.id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold">{row.name}</h2>
                <time className="text-xs text-muted">
                  {new Date(row.created_at).toLocaleString()}
                </time>
              </div>
              <p className="mt-1 text-sm text-muted">
                {row.phone} · {row.email}
              </p>
              {row.vehicle ? (
                <p className="mt-2 text-sm">{row.vehicle}</p>
              ) : null}
              {row.neighborhood ? (
                <p className="text-sm text-muted">{row.neighborhood}</p>
              ) : null}
              {row.notes ? (
                <p className="mt-3 text-sm leading-relaxed">{row.notes}</p>
              ) : null}
            </article>
          ))
        )}
      </div>
    </main>
  );
}
