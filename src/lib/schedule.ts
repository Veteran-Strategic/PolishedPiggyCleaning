export const TIME_ZONE = "America/New_York";
export const WINDOW_HOURS = [
  { start: 9, end: 10 },
  { start: 10, end: 11 },
  { start: 11, end: 12 },
  { start: 12, end: 13 },
  { start: 13, end: 14 },
  { start: 14, end: 15 },
  { start: 15, end: 16 },
  { start: 16, end: 17 },
  { start: 17, end: 18 },
] as const;
export const WINDOW_CAPACITY = 1;
export const DAYS_AHEAD = 14;
export const LEAD_MINUTES = 180;
export const CLOSED_WEEKDAYS = new Set([0]);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function tzParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
    weekday: get("weekday"),
  };
}

function offsetMs(date: Date) {
  const p = tzParts(date);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, 0);
  return asUtc - date.getTime();
}

export function zonedDate(year: number, month: number, day: number, hour = 0) {
  const utc = Date.UTC(year, month - 1, day, hour, 0, 0);
  let date = new Date(utc);
  const first = offsetMs(date);
  date = new Date(utc - first);
  const second = offsetMs(date);
  if (second !== first) date = new Date(utc - second);
  return date;
}

export function dayKey(date: Date) {
  const p = tzParts(date);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}`;
}

export function addDays(date: Date, days: number) {
  const p = tzParts(date);
  return zonedDate(p.year, p.month, p.day + days, 0);
}

function weekdayIndex(date: Date) {
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[tzParts(date).weekday] ?? 0;
}

export function openDays(from = new Date(), count = DAYS_AHEAD) {
  const days: Date[] = [];
  const start = tzParts(from);
  let cursor = zonedDate(start.year, start.month, start.day, 0);
  let guard = 0;
  while (days.length < count && guard < 40) {
    if (!CLOSED_WEEKDAYS.has(weekdayIndex(cursor))) days.push(cursor);
    cursor = addDays(cursor, 1);
    guard += 1;
  }
  return days;
}

function clockLabel(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${suffix}`;
}

export function formatWindowLabel(startHour: number, endHour: number) {
  return clockLabel(startHour);
}

export function slotsForDay(
  day: Date,
  counts: Record<string, number>,
  now = new Date(),
) {
  const p = tzParts(day);
  const earliest = new Date(now.getTime() + LEAD_MINUTES * 60 * 1000);
  return WINDOW_HOURS.map((window) => {
    const start = zonedDate(p.year, p.month, p.day, window.start);
    const iso = start.toISOString();
    const booked = counts[iso] ?? 0;
    return {
      startHour: window.start,
      endHour: window.end,
      start,
      iso,
      label: formatWindowLabel(window.start, window.end),
      booked,
      full: booked >= WINDOW_CAPACITY,
      past: start < earliest,
    };
  });
}

export function isBookableSlot(
  iso: string,
  counts: Record<string, number>,
  now = new Date(),
) {
  const start = new Date(iso);
  if (Number.isNaN(start.getTime())) return false;
  const key = start.toISOString();
  return openDays(now).some((day) =>
    slotsForDay(day, counts, now).some(
      (slot) => slot.iso === key && !slot.past && !slot.full,
    ),
  );
}

export function formatDayShort(date: Date) {
  const p = tzParts(date);
  return {
    weekday: new Intl.DateTimeFormat("en-US", {
      timeZone: TIME_ZONE,
      weekday: "short",
    }).format(date),
    monthDay: `${p.month}/${p.day}`,
    key: dayKey(date),
  };
}

export function windowEnd(start: Date) {
  const p = tzParts(start);
  const window = WINDOW_HOURS.find((w) => w.start === p.hour);
  const endHour = window?.end ?? p.hour + 1;
  return zonedDate(p.year, p.month, p.day, endHour);
}

export function rfc3339InZone(date: Date) {
  const p = tzParts(date);
  const totalMin = Math.round(offsetMs(date) / 60000);
  const sign = totalMin >= 0 ? "+" : "-";
  const abs = Math.abs(totalMin);
  const oh = pad(Math.floor(abs / 60));
  const om = pad(abs % 60);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}:00${sign}${oh}:${om}`;
}

export function formatAppointment(date: Date) {
  const p = tzParts(date);
  const time = clockLabel(p.hour);
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
  return `${day} at ${time}`;
}
