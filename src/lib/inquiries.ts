import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { isBookableSlot, WINDOW_CAPACITY } from "@/lib/schedule";
import { calendarPayload, rememberBooking } from "@/lib/google-calendar";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Tell us who to ask for."),
  phone: z.string().trim().min(7, "A phone number helps us confirm."),
  email: z.string().trim().email("Need a real email for confirmation."),
  vehicle: z.string().trim().max(80),
  neighborhood: z.string().trim().min(2, "Where should we pull in?"),
  notes: z.string().trim().max(600),
  scheduledFor: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), "Pick a time on the calendar."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export const detailsSchema = inquirySchema.omit({ scheduledFor: true });
export type DetailsInput = z.infer<typeof detailsSchema>;

async function windowCounts(sql: Awaited<ReturnType<typeof getSql>>) {
  const rows = await sql<{ scheduled_for: string; n: number }>`
    select scheduled_for::text as scheduled_for, count(*)::int as n
    from inquiries
    where scheduled_for is not null
      and scheduled_for > now()
    group by scheduled_for
  `;
  const counts: Record<string, number> = {};
  for (const row of rows) {
    if (!row.scheduled_for) continue;
    counts[new Date(row.scheduled_for).toISOString()] = Number(row.n);
  }
  return counts;
}

export const listWindowCounts = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    return windowCounts(sql);
  },
);

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: InquiryInput) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const counts = await windowCounts(sql);
    const iso = new Date(data.scheduledFor).toISOString();
    if (!isBookableSlot(iso, counts)) {
      throw new Error("That window just filled up. Pick another.");
    }
    const inserted = await sql<{ id: number }>`
      insert into inquiries (name, phone, email, vehicle, neighborhood, notes, scheduled_for)
      select
        ${data.name},
        ${data.phone},
        ${data.email},
        ${data.vehicle},
        ${data.neighborhood},
        ${data.notes},
        ${iso}::timestamptz
      where (
        select count(*) from inquiries
        where scheduled_for = ${iso}::timestamptz
      ) < ${WINDOW_CAPACITY}
      returning id
    `;
    if (!inserted.length) {
      throw new Error("That window just filled up. Pick another.");
    }
    const booking = calendarPayload({
      id: inserted[0].id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      vehicle: data.vehicle,
      neighborhood: data.neighborhood,
      notes: data.notes,
      scheduledFor: iso,
    });
    await rememberBooking(booking);
    return { ok: true as const, scheduledFor: iso };
  });

export type InquiryRow = {
  id: number;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  neighborhood: string;
  notes: string;
  scheduled_for: string | null;
  created_at: string;
};

export const listInquiries = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<InquiryRow>`
      select id, name, phone, email, vehicle, neighborhood, notes,
             scheduled_for::text as scheduled_for, created_at::text as created_at
      from inquiries
      order by coalesce(scheduled_for, created_at) desc
    `;
  });
