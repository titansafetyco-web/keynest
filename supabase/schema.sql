create extension if not exists "uuid-ossp";

create type public.user_role as enum ('member','creator','agent','broker','admin');
create type public.listing_status as enum ('draft','active','pending','sold','rented','archived');
create type public.campaign_status as enum ('draft','review','active','paused','complete','rejected');
create type public.kp_tx_type as enum ('earn','spend','hold','release','reversal','expire');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'member',
  username text unique,
  full_name text,
  bio text,
  avatar_url text,
  city text,
  state text,
  is_identity_verified boolean not null default false,
  is_license_verified boolean not null default false,
  pro_status boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete set null,
  status public.listing_status not null default 'draft',
  title text not null,
  description text,
  address_line1 text,
  city text,
  state text,
  postal_code text,
  price numeric,
  beds numeric,
  baths numeric,
  sqft integer,
  property_type text,
  latitude double precision,
  longitude double precision,
  cover_image_url text,
  media jsonb not null default '[]'::jsonb,
  listing_source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  post_type text not null default 'post',
  caption text,
  media jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table public.post_likes (
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id,user_id)
);

create table public.property_saves (
  property_id uuid references public.properties(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (property_id,user_id)
);

create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.collections (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.collection_properties (
  collection_id uuid references public.collections(id) on delete cascade,
  property_id uuid references public.properties(id) on delete cascade,
  position integer,
  primary key(collection_id,property_id)
);

create table public.kp_wallets (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  available_balance bigint not null default 0,
  held_balance bigint not null default 0,
  updated_at timestamptz not null default now()
);

create table public.kp_ledger (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tx_type public.kp_tx_type not null,
  amount bigint not null check (amount > 0),
  source_type text not null,
  source_id uuid,
  status text not null default 'posted',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.campaigns (
  id uuid primary key default uuid_generate_v4(),
  advertiser_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  post_id uuid references public.posts(id) on delete set null,
  objective text not null,
  status public.campaign_status not null default 'draft',
  budget_kp bigint not null default 0,
  budget_usd numeric not null default 0,
  start_at timestamptz,
  end_at timestamptz,
  audience jsonb not null default '{}'::jsonb,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  assigned_to uuid references public.profiles(id) on delete set null,
  consumer_id uuid references public.profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  source_type text,
  source_id uuid,
  stage text not null default 'new',
  name text,
  email text,
  phone text,
  message text,
  created_at timestamptz not null default now()
);

create table public.creator_links (
  id uuid primary key default uuid_generate_v4(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  code text not null unique,
  destination_type text not null,
  destination_id uuid,
  created_at timestamptz not null default now()
);

create table public.attribution_events (
  id uuid primary key default uuid_generate_v4(),
  creator_link_id uuid references public.creator_links(id) on delete set null,
  event_name text not null,
  visitor_id text,
  user_id uuid references public.profiles(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  qualified boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.posts enable row level security;
alter table public.follows enable row level security;
alter table public.post_likes enable row level security;
alter table public.property_saves enable row level security;
alter table public.comments enable row level security;
alter table public.collections enable row level security;
alter table public.collection_properties enable row level security;
alter table public.kp_wallets enable row level security;
alter table public.kp_ledger enable row level security;
alter table public.campaigns enable row level security;
alter table public.leads enable row level security;
alter table public.creator_links enable row level security;
alter table public.attribution_events enable row level security;

create policy "profiles public read" on public.profiles for select using (true);
create policy "properties active read" on public.properties for select using (status='active' or auth.uid()=owner_id);
create policy "posts public read" on public.posts for select using (true);
create policy "collections public read" on public.collections for select using (is_public=true or auth.uid()=owner_id);

create policy "profile self update" on public.profiles for update using (auth.uid()=id);
create policy "property owner write" on public.properties for all using (auth.uid()=owner_id) with check (auth.uid()=owner_id);
create policy "post author write" on public.posts for all using (auth.uid()=author_id) with check (auth.uid()=author_id);

create policy "wallet self read" on public.kp_wallets for select using (auth.uid()=user_id);
create policy "ledger self read" on public.kp_ledger for select using (auth.uid()=user_id);
create policy "campaign owner read" on public.campaigns for select using (auth.uid()=advertiser_id);
create policy "lead participant read" on public.leads for select using (auth.uid()=assigned_to or auth.uid()=consumer_id);

create index properties_city_state_idx on public.properties(city,state);
create index properties_status_idx on public.properties(status);
create index posts_author_idx on public.posts(author_id,created_at desc);
create index posts_property_idx on public.posts(property_id);
create index campaigns_advertiser_idx on public.campaigns(advertiser_id,created_at desc);
create index leads_assigned_idx on public.leads(assigned_to,created_at desc);
create index attribution_creator_link_idx on public.attribution_events(creator_link_id,created_at desc);
