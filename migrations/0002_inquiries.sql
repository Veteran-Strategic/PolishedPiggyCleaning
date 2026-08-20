create table if not exists inquiries (
  id serial primary key,
  name text not null,
  phone text not null,
  email text not null,
  vehicle text not null default '',
  neighborhood text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);
