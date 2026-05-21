-- ============================================================
-- SMVITM Alumni Portal - Yearbook Schema (Safe / Idempotent)
-- Run this in your Supabase SQL Editor
-- Works whether profiles table exists or not
-- ============================================================

-- ── Step 1: Create profiles table if it doesn't exist ───────
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  department    text,
  batch         text,
  role          text default 'alumni',
  company       text,
  job_title     text,
  location      text,
  bio           text,
  avatar_url    text,
  linkedin_url  text,
  birthday      date,
  is_hall_of_fame     boolean default false,
  hall_of_fame_reason text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Step 2: Safely add any columns that may be missing ──────
-- (safe to re-run; skips if column already exists)
alter table public.profiles add column if not exists full_name           text;
alter table public.profiles add column if not exists department          text;
alter table public.profiles add column if not exists batch               text;
alter table public.profiles add column if not exists role                text default 'alumni';
alter table public.profiles add column if not exists company             text;
alter table public.profiles add column if not exists job_title           text;
alter table public.profiles add column if not exists location            text;
alter table public.profiles add column if not exists bio                 text;
alter table public.profiles add column if not exists avatar_url          text;
alter table public.profiles add column if not exists linkedin_url        text;
alter table public.profiles add column if not exists birthday            date;
alter table public.profiles add column if not exists is_hall_of_fame     boolean default false;
alter table public.profiles add column if not exists hall_of_fame_reason text;
alter table public.profiles add column if not exists created_at          timestamptz default now();
alter table public.profiles add column if not exists updated_at          timestamptz default now();

-- ── Step 3: Yearbook wishes table ───────────────────────────
create table if not exists public.yearbook_wishes (
  id          uuid primary key default gen_random_uuid(),
  from_user   uuid references auth.users(id) on delete cascade,
  to_user     uuid references public.profiles(id) on delete cascade,
  message     text,
  emoji       text default '🎉',
  created_at  timestamptz default now(),
  unique(from_user, to_user)
);

-- ── Step 4: Row Level Security ───────────────────────────────
alter table public.profiles        enable row level security;
alter table public.yearbook_wishes enable row level security;

-- Drop existing policies before recreating (prevents duplicate errors)
drop policy if exists "Profiles are viewable by everyone"    on public.profiles;
drop policy if exists "Users can insert their own profile"   on public.profiles;
drop policy if exists "Users can update their own profile"   on public.profiles;
drop policy if exists "Wishes are viewable by everyone"      on public.yearbook_wishes;
drop policy if exists "Authenticated users can send wishes"  on public.yearbook_wishes;
drop policy if exists "Users can delete own wishes"          on public.yearbook_wishes;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Wishes are viewable by everyone"
  on public.yearbook_wishes for select using (true);

create policy "Authenticated users can send wishes"
  on public.yearbook_wishes for insert
  with check (auth.uid() = from_user);

create policy "Users can delete own wishes"
  on public.yearbook_wishes for delete
  using (auth.uid() = from_user);

-- ── Step 5: Performance Indexes ──────────────────────────────
create index if not exists idx_profiles_batch
  on public.profiles(batch);

create index if not exists idx_profiles_department
  on public.profiles(department);

create index if not exists idx_profiles_hall_of_fame
  on public.profiles(is_hall_of_fame) where is_hall_of_fame = true;

create index if not exists idx_profiles_full_name_fts
  on public.profiles using gin(to_tsvector('english', coalesce(full_name, '')));

create index if not exists idx_wishes_to_user
  on public.yearbook_wishes(to_user);

-- Birthday index: simple column index (to_char is not IMMUTABLE so can't be used in functional index)
create index if not exists idx_profiles_birthday
  on public.profiles(birthday)
  where birthday is not null;

-- ── Step 6: Auth Trigger (auto-sync signup → profiles) ───────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id, full_name, department, batch, role, avatar_url
  )
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'department',
    new.raw_user_meta_data->>'batch',
    coalesce(new.raw_user_meta_data->>'role', 'alumni'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set
    full_name   = excluded.full_name,
    department  = excluded.department,
    batch       = excluded.batch,
    role        = excluded.role,
    avatar_url  = excluded.avatar_url,
    updated_at  = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
