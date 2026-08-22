import { mkdir, readFile, writeFile } from "node:fs/promises";
import { formatAppointment, rfc3339InZone, TIME_ZONE, windowEnd } from "@/lib/schedule";

const BOOKINGS_PATH = "/workspace/artifacts/bookings.json";

export type CalendarBooking = {
  id: number;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  neighborhood: string;
  notes: string;
  scheduledFor: string;
  summary: string;
  location: string;
  description: string;
  start_time: string;
  end_time: string;
  timezone: string;
  synced: boolean;
};

export function calendarPayload(input: {
  id: number;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  neighborhood: string;
  notes: string;
  scheduledFor: string;
}): CalendarBooking {
  const start = new Date(input.scheduledFor);
  const end = windowEnd(start);
  const window = formatAppointment(start);
  const summary = `Polished Piggy: ${input.name}`;
  const location = input.neighborhood || "Greater Cincinnati";
  const lines = [
    window,
    input.phone && `Phone: ${input.phone}`,
    input.email && `Email: ${input.email}`,
    input.vehicle && `Vehicle: ${input.vehicle}`,
    input.neighborhood && `Neighborhood: ${input.neighborhood}`,
    input.notes && `Notes: ${input.notes}`,
    "Confirm, take payment, then drive.",
  ].filter(Boolean);
  return {
    ...input,
    summary,
    location,
    description: lines.join("\n"),
    start_time: rfc3339InZone(start),
    end_time: rfc3339InZone(end),
    timezone: TIME_ZONE,
    synced: false,
  };
}

export async function rememberBooking(booking: CalendarBooking) {
  try {
    await mkdir("/workspace/artifacts", { recursive: true });
    let existing: CalendarBooking[] = [];
    try {
      existing = JSON.parse(await readFile(BOOKINGS_PATH, "utf8")) as CalendarBooking[];
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }
    existing.push(booking);
    await writeFile(BOOKINGS_PATH, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error("[calendar] could not persist booking file", err);
  }
}

function icsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function icsEscape(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function bookingsToIcs(rows: CalendarBooking[]) {
  const now = icsDate(new Date());
  const events = rows.map((row) => {
    const start = new Date(row.scheduledFor);
    const end = windowEnd(start);
    return [
      "BEGIN:VEVENT",
      `UID:booking-${row.id}@polishedpiggycleaning.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${icsDate(start)}`,
      `DTEND:${icsDate(end)}`,
      `SUMMARY:${icsEscape(row.summary)}`,
      `LOCATION:${icsEscape(row.location)}`,
      `DESCRIPTION:${icsEscape(row.description)}`,
      "END:VEVENT",
    ].join("\r\n");
  });
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Polished Piggy//Bookings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Polished Piggy visits",
    "X-WR-TIMEZONE:America/New_York",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
