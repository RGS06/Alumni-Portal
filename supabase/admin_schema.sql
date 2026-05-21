-- ============================================================
-- SMVITM Alumni Portal - Admin Schema (Media Items)
-- Run this AFTER yearbook_schema.sql in Supabase SQL Editor
-- ============================================================

-- ── Media Items Table ────────────────────────────────────────
create table if not exists public.media_items (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  type        text not null default 'Event',   -- Event | Achievement | News | Document | Gallery | Other
  url         text,                             -- storage URL or external URL
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz default now()
);

-- Safely add any missing columns
alter table public.media_items add column if not exists title       text;
alter table public.media_items add column if not exists description text;
alter table public.media_items add column if not exists type        text default 'Event';
alter table public.media_items add column if not exists url         text;
alter table public.media_items add column if not exists created_by  uuid references auth.users(id) on delete set null;
alter table public.media_items add column if not exists created_at  timestamptz default now();

-- ── RLS ─────────────────────────────────────────────────────
alter table public.media_items enable row level security;

drop policy if exists "Media viewable by everyone"        on public.media_items;
drop policy if exists "Admins can insert media"           on public.media_items;
drop policy if exists "Admins can delete media"           on public.media_items;

-- Anyone can view media
create policy "Media viewable by everyone"
  on public.media_items for select using (true);

-- Only admins/superadmins can insert
create policy "Admins can insert media"
  on public.media_items for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role in ('admin', 'superadmin')
    )
  );

-- Only admins/superadmins can delete
create policy "Admins can delete media"
  on public.media_items for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role in ('admin', 'superadmin')
    )
  );

-- ── Indexes ──────────────────────────────────────────────────
create index if not exists idx_media_type       on public.media_items(type);
create index if not exists idx_media_created_at on public.media_items(created_at desc);

-- ── Supabase Storage bucket (run manually in Storage UI) ─────
-- Create a bucket named: alumni-media
-- Set to: Public
-- Allowed MIME types: image/*, application/pdf, video/*
-- Max file size: 50MB

-- ── Helper: Elevate a user to admin role ─────────────────────
-- Run this to make yourself an admin:
-- update public.profiles set role = 'admin' where id = '<your-user-uuid>';

-- ── Policy: Allow admin profiles update ──────────────────────
drop policy if exists "Admins can update any profile" on public.profiles;
create policy "Admins can update any profile"
  on public.profiles for update
  using (
    auth.uid() = id
    or exists (
      select 1 from public.profiles p2
      where p2.id = auth.uid()
      and p2.role in ('admin', 'superadmin')
    )
  );

-- ── Policy: Allow admin profiles delete ──────────────────────
drop policy if exists "Admins can delete any profile" on public.profiles;
create policy "Admins can delete any profile"
  on public.profiles for delete
  using (
    auth.uid() = id
    or exists (
      select 1 from public.profiles p2
      where p2.id = auth.uid()
      and p2.role in ('admin', 'superadmin')
    )
  );

-- ── Policy: Allow admin post deletion ────────────────────────
drop policy if exists "Admins can delete any post"    on public.posts;
create policy "Admins can delete any post"
  on public.posts for delete
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role in ('admin', 'superadmin')
    )
  );

-- ── Policy: Allow admin comment deletion ─────────────────────
drop policy if exists "Admins can delete any comment" on public.comments;
create policy "Admins can delete any comment"
  on public.comments for delete
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role in ('admin', 'superadmin')
    )
  );
