const PHOTO = {
  brownstone: "https://images.unsplash.com/photo-1559081548-c5bbb6222948?auto=format&fit=crop&w=1600&q=80",
  brownstone2: "https://images.unsplash.com/photo-1749292177172-66edfd44e7cc?auto=format&fit=crop&w=1600&q=80",
  kitchen: "https://images.unsplash.com/photo-1605276374104-dee2a23ffc31?auto=format&fit=crop&w=1600&q=80",
  living: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
  highrise: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
  highrise2: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
  condo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
  loft: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  loft2: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
  modern: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
  modern2: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80",
  modern3: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80",
  villa: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
  villa2: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
  villa3: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
  skyline: "/images/townliv2.webp",
  brick: "/images/townliv1.webp",
  loftLocal: "/images/mountainset.webp",
  pool: "/images/poolset.webp"
};

export const properties = [
  {
    id: "hudson-penthouse",
    price: "$2,750,000",
    address: "64 Sussex St",
    city: "Jersey City, NJ",
    beds: 5, baths: 4, sqft: "3,400",
    image: PHOTO.brownstone,
    agent: "Maya Carter",
    handle: "@jerseycityliving"
  },
  {
    id: "brooklyn-modern",
    price: "$1,750,000",
    address: "184 Kent Ave #A602",
    city: "Brooklyn, NY",
    beds: 2, baths: 2, sqft: "902",
    image: PHOTO.modern,
    agent: "Sofia Chen",
    handle: "@sofiarealty"
  },
  {
    id: "hoboken-loft",
    price: "$949,000",
    address: "1314 Hudson St #11",
    city: "Hoboken, NJ",
    beds: 2, baths: 2, sqft: "1,100",
    image: PHOTO.loft,
    agent: "Michael Torres",
    handle: "@michaelhomes"
  },
  {
    id: "miami-waterfront",
    price: "$6,990,000",
    address: "5701 N Bay Rd",
    city: "Miami Beach, FL",
    beds: 4, baths: 4.5, sqft: "3,623",
    image: PHOTO.villa,
    agent: "Ava Martinez",
    handle: "@avamoves"
  }
];

export type MarketingProperty = (typeof properties)[number];

export const featuredListings = [
  {
    id: "jc-skyline-estate",
    price: "$3,250,000",
    address: "103 Grand St",
    city: "Jersey City, NJ",
    beds: 5,
    baths: 4,
    sqft: "3,800",
    lat: 40.71555,
    lng: -74.03655,
    image: PHOTO.brownstone,
    badge: null as string | null,
    category: "luxury",
    agent: "Samantha Lee",
    agentTitle: "Verified Agent",
    agentImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "hoboken-townhome",
    price: "$1,425,000",
    address: "813 Washington St #1R",
    city: "Hoboken, NJ",
    beds: 3,
    baths: 2,
    sqft: "1,668",
    lat: 40.74785,
    lng: -74.02835,
    image: PHOTO.brick,
    badge: "Open House",
    category: "latest",
    agent: "Michael Torres",
    agentTitle: "Verified Agent",
    agentImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "nyc-penthouse",
    price: "$1,795,000",
    address: "1 Greene St #601",
    city: "Jersey City, NJ",
    beds: 3,
    baths: 2,
    sqft: "1,700",
    lat: 40.71525,
    lng: -74.03355,
    image: PHOTO.highrise,
    badge: null,
    category: "luxury",
    agent: "Jessica Moore",
    agentTitle: "Verified Agent",
    agentImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "jersey-condo",
    price: "$799,000",
    address: "380 Marin Blvd #2R",
    city: "Jersey City, NJ",
    beds: 2,
    baths: 2,
    sqft: "1,150",
    lat: 40.72045,
    lng: -74.04285,
    image: PHOTO.condo,
    badge: "Price Drop",
    category: "price-drop",
    agent: "Daniel Russo",
    agentTitle: "Verified Agent",
    agentImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
  }
];

export type FeaturedListing = (typeof featuredListings)[number];

export const communities = [
  {
    name: "Jersey City",
    members: "42 members",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Hoboken",
    members: "31 members",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "New York",
    members: "128 members",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Miami",
    members: "56 members",
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=85"
  }
];

export const communityStats = [
  { value: "250K+", label: "Members" },
  { value: "75K+", label: "Homes" },
  { value: "6,000+", label: "Verified Agents" },
  { value: "120+", label: "Communities" }
];

export const creators = [
  { name: "Jessica Moore", handle: "@jessicamoore", followers: "24.1K", focus: "Jersey City · Luxury", score: 96, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
  { name: "Michael Torres", handle: "@michaelhomes", followers: "18.6K", focus: "Hoboken · Townhomes", score: 94, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
  { name: "Samantha Lee", handle: "@samanthalee", followers: "21.4K", focus: "Waterfront · Estates", score: 93, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
  { name: "Daniel Russo", handle: "@danielrusso", followers: "15.2K", focus: "NYC · Condos", score: 91, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
  { name: "Emily Chen", handle: "@emilychenhomes", followers: "12.8K", focus: "First-time buyers", score: 90, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" },
  { name: "Capricia Rivera", handle: "@capriciarivera", followers: "9.4K", focus: "Miami · Waterfront", score: 88, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80" },
  { name: "Maya Carter", handle: "@jerseycityliving", followers: "18.4K", focus: "Jersey City · Condos", score: 92, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  { name: "Noah Williams", handle: "@nyclofts", followers: "31.2K", focus: "NYC · Lofts", score: 95, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
  { name: "Olivia Park", handle: "@firsthomeguide", followers: "12.8K", focus: "First-time buyers", score: 89, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" }
];

export type CreatorCard = (typeof creators)[number];

export const feedPosts = [
  {
    id: "p1",
    creator: "Maya Carter",
    handle: "@jerseycityliving",
    property: properties[0],
    caption: "Paulus Hook brownstone. Five bedrooms and a parlor floor built for entertaining.",
    likes: "8,421", comments: "238", saves: "1,104"
  },
  {
    id: "p2",
    creator: "Sofia Chen",
    handle: "@sofiarealty",
    property: properties[1],
    caption: "Austin Nichols House on Kent. Williamsburg waterfront with oversized windows.",
    likes: "5,988", comments: "167", saves: "892"
  }
];

export type KnRole = "Agent" | "Broker" | "Realtor" | "Spectator";

export const knRoles: KnRole[] = ["Agent", "Broker", "Realtor", "Spectator"];

export type KnAgent = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  city: string;
  website?: string;
  role?: KnRole;
  license?: string;
  followers: string;
  following: string;
  postCount: number;
  image: string;
  verified: boolean;
};

export type KnComment = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  text: string;
  time: string;
};

export type KnPost = {
  id: string;
  agentId: string;
  listingId: string;
  image: string;
  images?: string[];
  price: string;
  address: string;
  city: string;
  beds: number;
  baths: number;
  sqft: string;
  caption: string;
  likes: number;
  time: string;
  comments: KnComment[];
};

export function knPostPhotos(post: KnPost) {
  return post.images?.length ? post.images : [post.image];
}

export function knDaysOnMarket(post: KnPost) {
  const stamp = post.time.trim().toLowerCase();
  if (stamp === "now" || stamp.endsWith("h") || stamp.endsWith("m")) return 0;
  const days = Number.parseInt(stamp, 10);
  return Number.isFinite(days) ? days : 0;
}

export function knMarketLabel(days: number) {
  if (days <= 0) return "Just listed · 0 days on market";
  if (days === 1) return "1 day on market";
  return `${days} days on market`;
}

export function knMarketTitle(post: KnPost) {
  return knMarketLabel(knDaysOnMarket(post));
}

export function knDaysFromListedAt(listedAt?: string | null) {
  if (!listedAt) return null;
  const ms = Date.now() - Date.parse(listedAt);
  if (!Number.isFinite(ms)) return 0;
  return Math.max(0, Math.floor(ms / 86_400_000));
}

export type KnMessage = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
  listingId?: string;
};

export type KnThread = {
  id: string;
  agentId: string;
  preview: string;
  time: string;
  unread: boolean;
  messages: KnMessage[];
};

export const knViewer: KnAgent = {
  id: "you",
  name: "Alex Rivera",
  handle: "alexrivera",
  bio: "Hunting a waterfront place. Saving homes and following agents on KeyNest.",
  city: "Jersey City, NJ",
  role: "Spectator",
  followers: "128",
  following: "64",
  postCount: 0,
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  verified: false
};

export const knAgents: KnAgent[] = [
  { id: "a-jessica", name: "Jessica Moore", handle: "jessicamoore", bio: "Jersey City luxury. Private showings and skyline homes.", city: "Jersey City, NJ", website: "jessicamoorehomes.com", followers: "24.1K", following: "412", postCount: 2, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", verified: true },
  { id: "a-michael", name: "Michael Torres", handle: "michaelhomes", bio: "Hoboken townhomes and open houses every weekend.", city: "Hoboken, NJ", followers: "18.6K", following: "380", postCount: 2, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", verified: true },
  { id: "a-samantha", name: "Samantha Lee", handle: "samanthalee", bio: "Waterfront estates. If it has a pool and a view, I listed it.", city: "Jersey City, NJ", followers: "21.4K", following: "290", postCount: 2, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", verified: true },
  { id: "a-daniel", name: "Daniel Russo", handle: "danielrusso", bio: "NYC / JC condos. Price drops and first looks.", city: "New York, NY", followers: "15.2K", following: "501", postCount: 1, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", verified: true },
  { id: "a-maya", name: "Maya Carter", handle: "jerseycityliving", bio: "Riverfront living in JC. New posts daily.", city: "Jersey City, NJ", followers: "18.4K", following: "220", postCount: 1, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", verified: true },
  { id: "a-sofia", name: "Sofia Chen", handle: "sofiarealty", bio: "Brooklyn modern homes with oversized light.", city: "Brooklyn, NY", followers: "22.0K", following: "318", postCount: 1, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80", verified: true },
  { id: "a-noah", name: "Noah Williams", handle: "nyclofts", bio: "Lofts, warehouses, and penthouses across NYC.", city: "New York, NY", followers: "31.2K", following: "176", postCount: 1, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", verified: true },
  { id: "a-ava", name: "Ava Martinez", handle: "avamoves", bio: "Miami Beach waterfront. Sun, glass, and private docks.", city: "Miami Beach, FL", followers: "27.8K", following: "244", postCount: 1, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80", verified: true }
];

const c = (id: string, name: string, handle: string, avatar: string, text: string, time: string): KnComment => ({
  id, name, handle, avatar, text, time
});

export const knPosts: KnPost[] = [
  {
    id: "post-grove",
    agentId: "a-samantha",
    listingId: "jc-skyline-estate",
    image: PHOTO.brownstone,
    images: [PHOTO.brownstone, PHOTO.brownstone2, PHOTO.kitchen, PHOTO.living, PHOTO.brick],
    price: "$3,250,000",
    address: "103 Grand St",
    city: "Jersey City, NJ",
    beds: 5, baths: 4, sqft: "3,800",
    caption: "Paulus Hook brownstone just listed. Five beds, original brick, walk to PATH.",
    likes: 8421,
    time: "2h",
    comments: [
      c("c1", "Alex Rivera", "alexrivera", knViewer.image, "That parlor floor is unreal. Private showing this week?", "1h"),
      c("c2", "Maya Carter", "jerseycityliving", knAgents[4].image, "Grand Street is going to move fast.", "48m")
    ]
  },
  {
    id: "post-washington",
    agentId: "a-michael",
    listingId: "hoboken-townhome",
    image: PHOTO.brick,
    images: [PHOTO.brick, PHOTO.kitchen, PHOTO.living, "/images/townliv3.webp"],
    price: "$1,425,000",
    address: "813 Washington St #1R",
    city: "Hoboken, NJ",
    beds: 3, baths: 2, sqft: "1,668",
    caption: "Open house Saturday 12–2. Duplex on Washington, 1,668 sqft, two blocks to PATH.",
    likes: 5988,
    time: "4h",
    comments: [
      c("c3", "Olivia Park", "firsthomeguide", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80", "Saving this for a client. Is parking included?", "3h")
    ]
  },
  {
    id: "post-riverfront",
    agentId: "a-jessica",
    listingId: "nyc-penthouse",
    image: PHOTO.highrise,
    images: [PHOTO.highrise, PHOTO.highrise2, PHOTO.skyline, PHOTO.condo],
    price: "$1,795,000",
    address: "1 Greene St #601",
    city: "Jersey City, NJ",
    beds: 3, baths: 2, sqft: "1,700",
    caption: "Exchange Place waterfront. Three beds, Hudson light, and a terrace that photographs itself.",
    likes: 11204,
    time: "6h",
    comments: [
      c("c4", "Noah Williams", "nyclofts", knAgents[6].image, "This is the JC look everyone wants.", "5h")
    ]
  },
  {
    id: "post-marin",
    agentId: "a-daniel",
    listingId: "jersey-condo",
    image: PHOTO.condo,
    images: [PHOTO.condo, PHOTO.loft, PHOTO.kitchen, "/images/townliv3.webp"],
    price: "$799,000",
    address: "380 Marin Blvd #2R",
    city: "Jersey City, NJ",
    beds: 2, baths: 2, sqft: "1,150",
    caption: "Price drop this morning. Powerhouse Arts District, two bed, walk to Grove PATH.",
    likes: 3102,
    time: "8h",
    comments: [
      c("c5", "Emily Chen", "emilychenhomes", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80", "This is a strong first-home number.", "7h")
    ]
  },
  {
    id: "post-kent",
    agentId: "a-sofia",
    listingId: "brooklyn-modern",
    image: PHOTO.modern,
    images: [PHOTO.modern, PHOTO.modern2, PHOTO.modern3],
    price: "$1,750,000",
    address: "184 Kent Ave #A602",
    city: "Brooklyn, NY",
    beds: 2, baths: 2, sqft: "902",
    caption: "Austin Nichols House. Williamsburg waterfront, clean lines, oversized windows.",
    likes: 7440,
    time: "11h",
    comments: []
  },
  {
    id: "post-hudson-loft",
    agentId: "a-maya",
    listingId: "hudson-penthouse",
    image: PHOTO.brownstone2,
    images: [PHOTO.brownstone2, PHOTO.brownstone, PHOTO.living, PHOTO.kitchen],
    price: "$2,750,000",
    address: "64 Sussex St",
    city: "Jersey City, NJ",
    beds: 5, baths: 4, sqft: "3,400",
    caption: "Sussex Street brownstone. Five bedrooms and a parlor floor built for entertaining.",
    likes: 9210,
    time: "1d",
    comments: [
      c("c6", "Samantha Lee", "samanthalee", knAgents[2].image, "The evening light here is the whole pitch.", "20h")
    ]
  },
  {
    id: "post-hoboken-loft",
    agentId: "a-michael",
    listingId: "hoboken-loft",
    image: PHOTO.loft,
    images: [PHOTO.loft, PHOTO.loft2, PHOTO.kitchen, PHOTO.brick],
    price: "$949,000",
    address: "1314 Hudson St #11",
    city: "Hoboken, NJ",
    beds: 2, baths: 2, sqft: "1,100",
    caption: "Soho-style triplex loft on Hudson. Skylight, terrace, walk to the ferry.",
    likes: 4108,
    time: "1d",
    comments: []
  },
  {
    id: "post-miami",
    agentId: "a-ava",
    listingId: "miami-waterfront",
    image: PHOTO.villa,
    images: [PHOTO.villa, PHOTO.villa2, PHOTO.villa3, PHOTO.pool],
    price: "$6,990,000",
    address: "5701 N Bay Rd",
    city: "Miami Beach, FL",
    beds: 4, baths: 4.5, sqft: "3,623",
    caption: "North Bay Road waterfront. Four beds, private dock energy. Flying up Friday.",
    likes: 15602,
    time: "2d",
    comments: [
      c("c7", "Capricia Rivera", "capriciarivera", "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=80&q=80", "Send the floor plan when you can.", "1d")
    ]
  },
  {
    id: "post-loft-nyc",
    agentId: "a-noah",
    listingId: "walker-street",
    image: PHOTO.loftLocal,
    images: [PHOTO.loftLocal, PHOTO.loft, PHOTO.loft2, PHOTO.kitchen],
    price: "$4,375,000",
    address: "51 Walker St #3B",
    city: "New York, NY",
    beds: 3, baths: 2.5, sqft: "2,056",
    caption: "Tribeca loft at 51 Walker. Twelve-foot ceilings, key-lock elevator, quiet block.",
    likes: 12880,
    time: "2d",
    comments: []
  },
  {
    id: "post-estate-2",
    agentId: "a-samantha",
    listingId: "jc-skyline-estate",
    image: PHOTO.living,
    images: [PHOTO.living, PHOTO.brownstone, PHOTO.kitchen, PHOTO.brick],
    price: "$3,250,000",
    address: "103 Grand St",
    city: "Jersey City, NJ",
    beds: 5, baths: 4, sqft: "3,800",
    caption: "Golden hour on Grand Street. Still available.",
    likes: 6701,
    time: "3d",
    comments: []
  },
  {
    id: "post-jessica-2",
    agentId: "a-jessica",
    listingId: "nyc-penthouse",
    image: PHOTO.skyline,
    images: [PHOTO.skyline, PHOTO.highrise, PHOTO.highrise2, PHOTO.condo],
    price: "$1,795,000",
    address: "1 Greene St #601",
    city: "Jersey City, NJ",
    beds: 3, baths: 2, sqft: "1,700",
    caption: "Night view for the people who asked. 1 Greene still taking offers.",
    likes: 5304,
    time: "3d",
    comments: []
  }
];

export const knThreads: KnThread[] = [
  {
    id: "t-samantha",
    agentId: "a-samantha",
    preview: "I can do Grand Street at 5:30 tomorrow.",
    time: "12m",
    unread: true,
    messages: [
      { id: "m1", fromMe: true, text: "Is 103 Grand still available for a private showing?", time: "4:02 PM" },
      { id: "m2", fromMe: false, text: "Yes — I held it this week. Sending the listing.", time: "4:05 PM", listingId: "post-grove" },
      { id: "m3", fromMe: false, text: "I can do Grand Street at 5:30 tomorrow.", time: "4:06 PM" }
    ]
  },
  {
    id: "t-michael",
    agentId: "a-michael",
    preview: "Open house is Saturday 12–2.",
    time: "1h",
    unread: true,
    messages: [
      { id: "m4", fromMe: true, text: "Can I swing by 813 Washington this weekend?", time: "1:10 PM" },
      { id: "m5", fromMe: false, text: "Open house is Saturday 12–2. I’ll put you on the list.", time: "1:14 PM", listingId: "post-washington" }
    ]
  },
  {
    id: "t-jessica",
    agentId: "a-jessica",
    preview: "Greene Street terrace photos coming tonight.",
    time: "3h",
    unread: false,
    messages: [
      { id: "m6", fromMe: false, text: "Greene Street terrace photos coming tonight.", time: "11:20 AM" },
      { id: "m7", fromMe: true, text: "Please send the HOA packet too.", time: "11:41 AM" }
    ]
  },
  {
    id: "t-ava",
    agentId: "a-ava",
    preview: "North Bay Road walkthrough Friday 11am.",
    time: "1d",
    unread: false,
    messages: [
      { id: "m8", fromMe: true, text: "Any chance I can see 5701 N Bay Rd this week?", time: "Yesterday" },
      { id: "m9", fromMe: false, text: "North Bay Road walkthrough Friday 11am.", time: "Yesterday", listingId: "post-miami" }
    ]
  }
];

export function knAgentById(id: string) {
  return knAgents.find(a => a.id === id) ?? knViewer;
}

export function knAgentByHandle(handle: string) {
  const slug = handle.replace(/^@/, "").toLowerCase();
  if (slug === knViewer.handle) return knViewer;
  return knAgents.find(a => a.handle === slug);
}

export function knPostsByAgent(agentId: string) {
  return knPosts.filter(p => p.agentId === agentId);
}

export function knPostById(id: string) {
  return knPosts.find(p => p.id === id);
}

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "jersey city": { lat: 40.7282, lng: -74.0776 },
  hoboken: { lat: 40.744, lng: -74.0324 },
  brooklyn: { lat: 40.718, lng: -73.958 },
  "new york": { lat: 40.7163, lng: -74.0086 },
  "miami beach": { lat: 25.7907, lng: -80.13 },
  miami: { lat: 25.7617, lng: -80.1918 }
};

const LISTING_COORDS: Record<string, { lat: number; lng: number }> = {
  "hudson-penthouse": { lat: 40.71485, lng: -74.03625 },
  "brooklyn-modern": { lat: 40.71955, lng: -73.97355 },
  "hoboken-loft": { lat: 40.75385, lng: -74.02525 },
  "miami-waterfront": { lat: 25.81085, lng: -80.14095 },
  "walker-street": { lat: 40.71942, lng: -74.00318 }
};

export function listingCoords(id: string, city: string, lat?: number | null, lng?: number | null) {
  if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat: lat as number, lng: lng as number };
  const featured = featuredListings.find(item => item.id === id);
  if (featured) return { lat: featured.lat, lng: featured.lng };
  const extra = LISTING_COORDS[id];
  if (extra) return extra;
  const match = Object.keys(CITY_COORDS).find(key => city.toLowerCase().includes(key));
  return match ? CITY_COORDS[match] : CITY_COORDS["jersey city"];
}

export function knMapPoint(post: KnPost) {
  const featured = featuredListings.find(item => item.id === post.listingId);
  if (featured) {
    return { lat: featured.lat, lng: featured.lng, propertyId: featured.id };
  }
  const listed = properties.find(item => item.id === post.listingId);
  const extra = LISTING_COORDS[post.listingId];
  if (extra) {
    return { ...extra, propertyId: listed?.id ?? post.listingId };
  }
  const city = post.city.toLowerCase();
  const match = Object.keys(CITY_COORDS).find(key => city.includes(key));
  const coords = match ? CITY_COORDS[match] : CITY_COORDS["jersey city"];
  const byAddress = [...featuredListings, ...properties].find(item => item.address === post.address);
  return { ...coords, propertyId: byAddress?.id ?? post.listingId };
}

export function knThreadById(id: string) {
  return knThreads.find(t => t.id === id);
}

export function knThreadByAgentId(agentId: string) {
  return knThreads.find(t => t.agentId === agentId);
}

export type KnActivityKind = "like" | "comment" | "follow" | "showing";

export type KnActivity = {
  id: string;
  kind: KnActivityKind;
  actorId: string;
  postId?: string;
  threadId?: string;
  text: string;
  time: string;
  unread: boolean;
};

export const knActivity: KnActivity[] = [
  {
    id: "n1",
    kind: "like",
    actorId: "a-samantha",
    postId: "post-grove",
    text: "liked your comment: “That terrace is unreal. Private showing this week?”",
    time: "12m",
    unread: true
  },
  {
    id: "n2",
    kind: "follow",
    actorId: "a-jessica",
    text: "started following you.",
    time: "28m",
    unread: true
  },
  {
    id: "n3",
    kind: "showing",
    actorId: "a-samantha",
    postId: "post-grove",
    threadId: "t-samantha",
    text: "confirmed a private showing at 103 Grand St tomorrow 5:30.",
    time: "41m",
    unread: true
  },
  {
    id: "n4",
    kind: "comment",
    actorId: "a-michael",
    postId: "post-washington",
    text: "mentioned you: “@alexrivera parking is included — I’ll send the packet.”",
    time: "2h",
    unread: true
  },
  {
    id: "n5",
    kind: "follow",
    actorId: "a-daniel",
    text: "started following you.",
    time: "5h",
    unread: false
  },
  {
    id: "n6",
    kind: "like",
    actorId: "a-maya",
    postId: "post-riverfront",
    text: "liked a listing you saved.",
    time: "1d",
    unread: false
  },
  {
    id: "n7",
    kind: "showing",
    actorId: "a-michael",
    postId: "post-washington",
    threadId: "t-michael",
    text: "put you on the Saturday open-house list for 813 Washington St.",
    time: "1d",
    unread: false
  },
  {
    id: "n8",
    kind: "follow",
    actorId: "a-sofia",
    text: "started following you.",
    time: "3d",
    unread: false
  },
  {
    id: "n9",
    kind: "comment",
    actorId: "a-ava",
    postId: "post-miami",
    text: "replied: “Floor plan is in your messages — Bay Drive Friday 11am.”",
    time: "3d",
    unread: false
  }
];
