
-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile upsert" on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

-- updated_at trigger
create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated before update on public.profiles for each row execute function public.set_updated_at();

-- handle new user
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- api tokens for the chrome extension
create table public.api_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token text not null unique,
  label text not null default 'Chrome Extension',
  last_used_at timestamptz,
  created_at timestamptz not null default now()
);
create index on public.api_tokens(user_id);
grant select, insert, update, delete on public.api_tokens to authenticated;
grant all on public.api_tokens to service_role;
alter table public.api_tokens enable row level security;
create policy "own tokens" on public.api_tokens for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- sessions
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  platform text not null,
  category text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  prompt_count integer not null default 0,
  created_at timestamptz not null default now()
);
create index on public.sessions(user_id, started_at desc);
create index on public.sessions(user_id, platform);
grant select, insert, update, delete on public.sessions to authenticated;
grant all on public.sessions to service_role;
alter table public.sessions enable row level security;
create policy "own sessions" on public.sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- events
create table public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references public.sessions(id) on delete cascade,
  event_type text not null,
  platform text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);
create index on public.events(user_id, occurred_at desc);
grant select, insert, update, delete on public.events to authenticated;
grant all on public.events to service_role;
alter table public.events enable row level security;
create policy "own events" on public.events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- productivity scores
create table public.productivity_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  score integer not null check (score between 0 and 100),
  breakdown jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, date)
);
grant select, insert, update, delete on public.productivity_scores to authenticated;
grant all on public.productivity_scores to service_role;
alter table public.productivity_scores enable row level security;
create policy "own scores" on public.productivity_scores for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
