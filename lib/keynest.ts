import { createBrowserClient } from "@supabase/ssr";
import { lockedSupabaseUrl } from "@/lib/deploy-lock";
import {
  creators,
  featuredListings,
  knAgents,
  knDaysFromListedAt,
  knDaysOnMarket,
  knPosts,
  knViewer,
  listingCoords,
  properties,
  type CreatorCard,
  type FeaturedListing,
  type KnAgent,
  type KnComment,
  type KnPost,
  type KnRole,
  type MarketingProperty
} from "@/lib/mock-data";

export type ListingRecord = MarketingProperty & {
  agentImage?: string;
  images: string[];
  daysOnMarket: number;
  lat: number;
  lng: number;
};

type ProfileRow = {
  id: string;
  handle: string;
  name: string;
  bio: string;
  city: string;
  website: string | null;
  role: string;
  license: string | null;
  followers: string;
  following: string;
  post_count: number;
  image: string;
  verified: boolean;
  focus: string | null;
  score: number | null;
};

type ListingRow = {
  id: string;
  owner_id: string;
  address: string;
  city: string;
  beds: number | string;
  baths: number | string;
  sqft: string;
  price_label: string;
  image: string;
  images: string[] | null;
  badge: string | null;
  category: string | null;
  lat: number | null;
  lng: number | null;
  agent_title: string | null;
  listed_at?: string | null;
};

type PostRow = {
  id: string;
  listing_id: string;
  author_id: string;
  caption: string;
  time_label: string;
  likes: number;
  comments: KnComment[] | null;
  image: string | null;
  images: string[] | null;
  created_at?: string;
};

function anonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
}

export function keynestClient() {
  return createBrowserClient(lockedSupabaseUrl(), anonKey());
}

export function mapAgent(row: ProfileRow): KnAgent {
  return {
    id: row.id,
    name: row.name,
    handle: row.handle.replace(/^@/, ""),
    bio: row.bio,
    city: row.city,
    website: row.website || undefined,
    role: (row.role as KnRole) || "Agent",
    license: row.license || undefined,
    followers: row.followers,
    following: row.following,
    postCount: row.post_count,
    image: row.image,
    verified: row.verified
  };
}

function mapCreator(row: ProfileRow): CreatorCard {
  return {
    name: row.name,
    handle: `@${row.handle.replace(/^@/, "")}`,
    followers: row.followers,
    focus: row.focus || row.city,
    score: row.score ?? 90,
    image: row.image
  };
}

function mapFeatured(listing: ListingRow, owner?: ProfileRow): FeaturedListing {
  return {
    id: listing.id,
    price: listing.price_label,
    address: listing.address,
    city: listing.city,
    beds: Number(listing.beds),
    baths: Number(listing.baths),
    sqft: listing.sqft,
    lat: listing.lat ?? 40.7282,
    lng: listing.lng ?? -74.0776,
    image: listing.image,
    badge: listing.badge,
    category: listing.category ?? "latest",
    agent: owner?.name ?? "Agent",
    agentTitle: listing.agent_title ?? "Verified Agent",
    agentImage: owner?.image ?? ""
  };
}

function daysOnMarketFor(id: string, listedAt?: string | null) {
  const fromDate = knDaysFromListedAt(listedAt);
  if (fromDate != null) return fromDate;
  const post = knPosts.find(item => item.listingId === id);
  return post ? knDaysOnMarket(post) : 0;
}

function listingPhotos(id: string, cover: string, stored?: string[] | null) {
  const fromPosts = knPosts
    .filter(post => post.listingId === id)
    .flatMap(post => post.images?.length ? post.images : [post.image]);
  return [...new Set([cover, ...(stored ?? []), ...fromPosts].filter(Boolean))];
}

function fromMockProperty(p: MarketingProperty): ListingRecord {
  const coords = listingCoords(p.id, p.city);
  return {
    ...p,
    ...coords,
    images: listingPhotos(p.id, p.image),
    daysOnMarket: daysOnMarketFor(p.id)
  };
}

function mapProperty(listing: ListingRow, owner?: ProfileRow): ListingRecord {
  return {
    id: listing.id,
    price: listing.price_label,
    address: listing.address,
    city: listing.city,
    beds: Number(listing.beds),
    baths: Number(listing.baths),
    sqft: listing.sqft,
    image: listing.image,
    lat: listing.lat ?? 40.7282,
    lng: listing.lng ?? -74.0776,
    agent: owner?.name ?? "Agent",
    handle: owner ? `@${owner.handle.replace(/^@/, "")}` : "@agent",
    agentImage: owner?.image,
    images: listingPhotos(listing.id, listing.image, listing.images),
    daysOnMarket: daysOnMarketFor(listing.id, listing.listed_at)
  };
}

function mapPost(post: PostRow, listing?: ListingRow): KnPost {
  const images = (post.images?.length ? post.images : listing?.images) ?? [];
  const image = post.image || listing?.image || images[0] || "";
  return {
    id: post.id,
    agentId: post.author_id,
    listingId: post.listing_id,
    image,
    images: images.length ? images : image ? [image] : [],
    price: listing?.price_label ?? "",
    address: listing?.address ?? "",
    city: listing?.city ?? "",
    beds: Number(listing?.beds ?? 0),
    baths: Number(listing?.baths ?? 0),
    sqft: listing?.sqft ?? "",
    caption: post.caption,
    likes: post.likes,
    time: post.time_label,
    comments: post.comments ?? []
  };
}

async function fetchTables() {
  if (!anonKey()) throw new Error("missing anon key");
  const sb = keynestClient();
  const [profiles, listings, posts] = await Promise.all([
    sb.from("keynest_profiles").select("*"),
    sb.from("keynest_listings").select("*"),
    sb.from("keynest_posts").select("*").order("created_at", { ascending: false })
  ]);
  if (profiles.error) throw profiles.error;
  if (listings.error) throw listings.error;
  if (posts.error) throw posts.error;
  return {
    profiles: (profiles.data ?? []) as ProfileRow[],
    listings: (listings.data ?? []) as ListingRow[],
    posts: (posts.data ?? []) as PostRow[]
  };
}

export async function loadKeynestFeed(): Promise<{
  posts: KnPost[];
  agents: KnAgent[];
  viewer: KnAgent;
}> {
  try {
    const { profiles, listings, posts } = await fetchTables();
    const listingById = new Map(listings.map(row => [row.id, row]));
    const agents = profiles.filter(row => row.id !== "you").map(mapAgent);
    const viewerRow = profiles.find(row => row.id === "you");
    return {
      posts: posts.map(post => mapPost(post, listingById.get(post.listing_id))),
      agents: agents.length ? agents : knAgents,
      viewer: viewerRow ? mapAgent(viewerRow) : knViewer
    };
  } catch {
    return { posts: knPosts, agents: knAgents, viewer: knViewer };
  }
}

export async function loadFeaturedListings(): Promise<FeaturedListing[]> {
  try {
    const { profiles, listings } = await fetchTables();
    const owners = new Map(profiles.map(row => [row.id, row]));
    const featured = listings.filter(row =>
      row.category === "luxury" || row.category === "latest" || row.category === "price-drop"
    );
    const rows = featured.length ? featured : listings;
    return rows.length ? rows.map(row => mapFeatured(row, owners.get(row.owner_id))) : featuredListings;
  } catch {
    return featuredListings;
  }
}

export async function loadMarketingProperties(): Promise<ListingRecord[]> {
  try {
    const { profiles, listings } = await fetchTables();
    const owners = new Map(profiles.map(row => [row.id, row]));
    return listings.length
      ? listings.map(row => mapProperty(row, owners.get(row.owner_id)))
      : properties.map(fromMockProperty);
  } catch {
    return properties.map(fromMockProperty);
  }
}

export async function loadCreators(): Promise<CreatorCard[]> {
  try {
    const { profiles } = await fetchTables();
    const people = profiles.filter(row => row.id !== "you");
    return people.length ? people.map(mapCreator) : creators;
  } catch {
    return creators;
  }
}

export async function loadListingById(id: string): Promise<ListingRecord | undefined> {
  const list = await loadMarketingProperties();
  const featured = await loadFeaturedListings();
  const listed = list.find(item => item.id === id);
  if (listed) return listed;
  const hit = featured.find(item => item.id === id);
  if (!hit) return undefined;
  return {
    ...hit,
    handle: `@${hit.agent.toLowerCase().replace(/\s+/g, "")}`,
    images: listingPhotos(hit.id, hit.image),
    daysOnMarket: daysOnMarketFor(hit.id)
  };
}

export async function loadProfileByHandle(handle: string): Promise<KnAgent | undefined> {
  const slug = handle.replace(/^@/, "").toLowerCase();
  try {
    const { profiles } = await fetchTables();
    const row = profiles.find(item => item.handle.replace(/^@/, "").toLowerCase() === slug);
    return row ? mapAgent(row) : undefined;
  } catch {
    return undefined;
  }
}

function parsePrice(label: string) {
  const n = Number(label.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export async function saveKeynestPost(post: KnPost) {
  if (!anonKey()) return;
  const sb = keynestClient();
  const listing = {
    id: post.listingId,
    owner_id: post.agentId,
    address: post.address,
    city: post.city,
    beds: post.beds,
    baths: post.baths,
    sqft: post.sqft,
    price_label: post.price,
    price: parsePrice(post.price),
    image: post.image,
    images: post.images ?? [post.image],
    category: "latest",
    listed_at: new Date().toISOString()
  };
  const listingRes = await sb.from("keynest_listings").upsert(listing);
  if (listingRes.error) throw listingRes.error;
  const postRes = await sb.from("keynest_posts").upsert({
    id: post.id,
    listing_id: post.listingId,
    author_id: post.agentId,
    caption: post.caption,
    time_label: post.time,
    likes: post.likes,
    comments: post.comments,
    image: post.image,
    images: post.images ?? [post.image]
  });
  if (postRes.error) throw postRes.error;
}

export async function deleteKeynestPost(id: string) {
  if (!anonKey()) return;
  const sb = keynestClient();
  const { error } = await sb.from("keynest_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function updateKeynestPostImages(id: string, images: string[]) {
  if (!anonKey()) return;
  const sb = keynestClient();
  const { error } = await sb.from("keynest_posts").update({
    image: images[0] ?? null,
    images
  }).eq("id", id);
  if (error) throw error;
}

export async function saveKeynestProfile(agent: KnAgent) {
  if (!anonKey()) return;
  const sb = keynestClient();
  const { error } = await sb.from("keynest_profiles").upsert({
    id: agent.id,
    handle: agent.handle.replace(/^@/, ""),
    name: agent.name,
    bio: agent.bio,
    city: agent.city,
    website: agent.website ?? null,
    role: agent.role ?? "Agent",
    license: agent.license ?? null,
    followers: agent.followers,
    following: agent.following,
    post_count: agent.postCount,
    image: agent.image,
    verified: agent.verified
  });
  if (error) throw error;
}

export async function saveKeynestComment(postId: string, comments: KnComment[]) {
  if (!anonKey()) return;
  const sb = keynestClient();
  const { error } = await sb.from("keynest_posts").update({ comments }).eq("id", postId);
  if (error) throw error;
}
