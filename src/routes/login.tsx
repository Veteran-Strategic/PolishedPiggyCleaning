import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        Staff
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold uppercase tracking-wide">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-muted">
        Inbox access for The Polished Piggy.
      </p>
      <div className="mt-8 space-y-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => signIn(p.providerId, { callbackURL: "/inbox" })}
              className="w-full rounded-full border border-border bg-surface px-4 py-3 text-sm font-semibold hover:border-primary/50"
            >
              Continue with {p.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
      </div>
    </main>
  );
}
