-- Database Schema for Copper Hearth
-- Paste these commands into the Supabase SQL Editor to set up your tables.

-- 1. Create the votes table
create table if not exists public.votes (
  id uuid default gen_random_uuid() primary key,
  finish_id text not null,
  finish_name text not null,
  email text not null,
  phone text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for votes
alter table public.votes enable row level security;

-- Add RLS policies for votes
create policy "Allow public inserts on votes" on public.votes
  for insert with check (true);

create policy "Allow public select on votes" on public.votes
  for select using (true);


-- 2. Create the signups table
create table if not exists public.signups (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  phone text not null,
  source text not null, -- e.g., 'inline', 'modal', 'vote'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for signups
alter table public.signups enable row level security;

-- Add RLS policies for signups
create policy "Allow public inserts on signups" on public.signups
  for insert with check (true);

create policy "Allow public select on signups" on public.signups
  for select using (true);
