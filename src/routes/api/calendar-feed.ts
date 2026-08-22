import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";
import { bookingsToIcs, calendarPayload } from "@/lib/google-calendar";

const FEED_KEY = process.env.CALENDAR_ICS_KEY ?? "polished-piggy-visits";

export const Route = createFileRoute("/api/calendar-feed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const key = new URL(request.url).searchParams.get("key");
        if (key !== FEED_KEY) {
          return new Response("Not found", { status: 404 });
        }
        const sql = await getSql();
        const rows = await sql<{
          id: number;
          name: string;
          phone: string;
          email: string;
          vehicle: string;
          neighborhood: string;
          notes: string;
          scheduled_for: string | null;
        }>`
          select id, name, phone, email, vehicle, neighborhood, notes,
                 scheduled_for::text as scheduled_for
          from inquiries
          where scheduled_for is not null
          order by scheduled_for
        `;
        const bookings = rows
          .filter((row) => row.scheduled_for)
          .map((row) =>
            calendarPayload({
              id: row.id,
              name: row.name,
              phone: row.phone,
              email: row.email,
              vehicle: row.vehicle,
              neighborhood: row.neighborhood,
              notes: row.notes,
              scheduledFor: new Date(row.scheduled_for as string).toISOString(),
            }),
          );
        return new Response(bookingsToIcs(bookings), {
          headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": "inline; filename=polished-piggy.ics",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
