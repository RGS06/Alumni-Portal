-- ============================================================
-- SMVITM Alumni Portal - Forum Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- POSTS TABLE
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade not null,
  title        text not null,
  content      text not null,
  category     text not null default 'General',
  author_name  text,
  author_role  text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- COMMENTS TABLE
create table if not exists public.comments (
  id           uuid primary key default gen_random_uuid(),
  post_id      uuid references public.posts(id) on delete cascade not null,
  user_id      uuid references auth.users(id) on delete cascade not null,
  content      text not null,
  author_name  text,
  author_role  text,
  created_at   timestamptz default now()
);

-- ROW LEVEL SECURITY
alter table public.posts    enable row level security;
alter table public.comments enable row level security;

-- POSTS POLICIES
-- Anyone can read posts
create policy "Posts are viewable by everyone"
  on public.posts for select using (true);

-- Authenticated users can insert
create policy "Authenticated users can create posts"
  on public.posts for insert
  with check (auth.uid() = user_id);

-- Users can update their own posts
create policy "Users can update own posts"
  on public.posts for update
  using (auth.uid() = user_id);

-- Users can delete their own posts
create policy "Users can delete own posts"
  on public.posts for delete
  using (auth.uid() = user_id);

-- COMMENTS POLICIES
create policy "Comments are viewable by everyone"
  on public.comments for select using (true);

create policy "Authenticated users can create comments"
  on public.comments for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.comments for delete
  using (auth.uid() = user_id);

-- INDEXES for performance
create index if not exists idx_posts_created_at    on public.posts(created_at desc);
create index if not exists idx_posts_category      on public.posts(category);
create index if not exists idx_comments_post_id    on public.comments(post_id);
