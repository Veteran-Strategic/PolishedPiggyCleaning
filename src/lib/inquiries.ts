import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Tell us who to ask for."),
  phone: z.string().trim().min(7, "A phone number helps us book faster."),
  email: z.string().trim().email("Need a real email for confirmation."),
  vehicle: z.string().trim().max(80),
  neighborhood: z.string().trim().max(80),
  notes: z.string().trim().max(600),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: InquiryInput) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into inquiries (name, phone, email, vehicle, neighborhood, notes)
      values (${data.name}, ${data.phone}, ${data.email}, ${data.vehicle}, ${data.neighborhood}, ${data.notes})
    `;
    return { ok: true as const };
  });

export type InquiryRow = {
  id: number;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  neighborhood: string;
  notes: string;
  created_at: string;
};

export const listInquiries = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<InquiryRow>`
      select id, name, phone, email, vehicle, neighborhood, notes, created_at
      from inquiries
      order by created_at desc
    `;
  });
