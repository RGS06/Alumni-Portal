-- ============================================================
-- SMVITM Alumni Portal - Yearbook Entries Table
-- For admin-imported / manually-added alumni (not portal users)
-- Run in Supabase SQL Editor
-- ============================================================

create table if not exists public.yearbook_entries (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  department   text,
  batch        text,
  birthday     date,
  job_title    text,
  company      text,
  location     text,
  linkedin_url text,
  avatar_url   text,
  bio          text,
  is_hall_of_fame     boolean default false,
  hall_of_fame_reason text,
  added_by     uuid references auth.users(id) on delete set null,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Safely add columns if missing
alter table public.yearbook_entries add column if not exists full_name           text;
alter table public.yearbook_entries add column if not exists department          text;
alter table public.yearbook_entries add column if not exists batch               text;
alter table public.yearbook_entries add column if not exists birthday            date;
alter table public.yearbook_entries add column if not exists job_title           text;
alter table public.yearbook_entries add column if not exists company             text;
alter table public.yearbook_entries add column if not exists location            text;
alter table public.yearbook_entries add column if not exists linkedin_url        text;
alter table public.yearbook_entries add column if not exists avatar_url          text;
alter table public.yearbook_entries add column if not exists bio                 text;
alter table public.yearbook_entries add column if not exists is_hall_of_fame     boolean default false;
alter table public.yearbook_entries add column if not exists hall_of_fame_reason text;
alter table public.yearbook_entries add column if not exists added_by            uuid;
alter table public.yearbook_entries add column if not exists created_at          timestamptz default now();
alter table public.yearbook_entries add column if not exists updated_at          timestamptz default now();

-- Row Level Security
alter table public.yearbook_entries enable row level security;

drop policy if exists "Yearbook entries viewable by everyone"  on public.yearbook_entries;
drop policy if exists "Admins can insert yearbook entries"     on public.yearbook_entries;
drop policy if exists "Admins can update yearbook entries"     on public.yearbook_entries;
drop policy if exists "Admins can delete yearbook entries"     on public.yearbook_entries;

create policy "Yearbook entries viewable by everyone"
  on public.yearbook_entries for select using (true);

create policy "Admins can insert yearbook entries"
  on public.yearbook_entries for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','superadmin')
    )
  );

create policy "Admins can update yearbook entries"
  on public.yearbook_entries for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','superadmin')
    )
  );

create policy "Admins can delete yearbook entries"
  on public.yearbook_entries for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin','superadmin')
    )
  );

-- Performance Indexes
create index if not exists idx_ye_batch      on public.yearbook_entries(batch);
create index if not exists idx_ye_department on public.yearbook_entries(department);
create index if not exists idx_ye_birthday   on public.yearbook_entries(birthday) where birthday is not null;
create index if not exists idx_ye_hof        on public.yearbook_entries(is_hall_of_fame) where is_hall_of_fame = true;
