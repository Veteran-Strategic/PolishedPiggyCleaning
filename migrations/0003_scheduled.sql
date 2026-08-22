alter table inquiries
  add column if not exists scheduled_for timestamptz;

create unique index if not exists inquiries_scheduled_for_uidx
  on inquiries (scheduled_for);
