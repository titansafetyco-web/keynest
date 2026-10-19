export const properties = [
  {
    id: "hudson-penthouse",
    price: "$2,850,000",
    address: "88 Riverfront Ave",
    city: "Jersey City, NJ",
    beds: 3, baths: 3.5, sqft: "2,410",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    agent: "Michael Torres",
    handle: "@michaelhomes"
  },
  {
    id: "brooklyn-modern",
    price: "$1,795,000",
    address: "214 Kent Avenue",
    city: "Brooklyn, NY",
    beds: 2, baths: 2, sqft: "1,690",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    agent: "Sofia Chen",
    handle: "@sofiarealty"
  },
  {
    id: "hoboken-loft",
    price: "$1,225,000",
    address: "57 Hudson Street",
    city: "Hoboken, NJ",
    beds: 2, baths: 2, sqft: "1,420",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    agent: "Daniel Brooks",
    handle: "@danielproperties"
  },
  {
    id: "miami-waterfront",
    price: "$4,950,000",
    address: "102 Bay Drive",
    city: "Miami Beach, FL",
    beds: 5, baths: 6, sqft: "4,880",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
    agent: "Ava Martinez",
    handle: "@avamoves"
  }
];

export const featuredListings = [
  {
    id: "jc-skyline-estate",
    price: "$4,250,000",
    address: "12 Grove Street",
    city: "Jersey City, NJ",
    beds: 5,
    baths: 4.5,
    sqft: "4,120",
    lat: 40.71929,
    lng: -74.04285,
    image: "/images/housepool.webp",
    badge: null as string | null,
    category: "luxury",
    agent: "Samantha Lee",
    agentTitle: "Verified Agent",
    agentImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "hoboken-townhome",
    price: "$1,795,000",
    address: "214 Washington St",
    city: "Hoboken, NJ",
    beds: 3,
    baths: 2.5,
    sqft: "2,040",
    lat: 40.73929,
    lng: -74.03068,
    image: "/images/townliv1.webp",
    badge: "Open House",
    category: "latest",
    agent: "Michael Torres",
    agentTitle: "Verified Agent",
    agentImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "nyc-penthouse",
    price: "$2,850,000",
    address: "88 Riverfront Ave",
    city: "Jersey City, NJ",
    beds: 3,
    baths: 3.5,
    sqft: "2,410",
    lat: 40.72755,
    lng: -74.03205,
    image: "/images/townliv2.webp",
    badge: null,
    category: "luxury",
    agent: "Jessica Moore",
    agentTitle: "Verified Agent",
    agentImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "jersey-condo",
    price: "$879,000",
    address: "401 Marin Blvd",
    city: "Jersey City, NJ",
    beds: 2,
    baths: 2,
    sqft: "1,180",
    lat: 40.72333,
    lng: -74.04085,
    image: "/images/townliv3.webp",
    badge: "Price Drop",
    category: "price-drop",
    agent: "Daniel Russo",
    agentTitle: "Verified Agent",
    agentImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
  }
];

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

export const feedPosts = [
  {
    id: "p1",
    creator: "Maya Carter",
    handle: "@jerseycityliving",
    property: properties[0],
    caption: "Waterfront views, three bedrooms and a skyline-facing terrace. This one deserves a save.",
    likes: "8,421", comments: "238", saves: "1,104"
  },
  {
    id: "p2",
    creator: "Sofia Chen",
    handle: "@sofiarealty",
    property: properties[1],
    caption: "A bright Brooklyn residence with clean lines and oversized windows.",
    likes: "5,988", comments: "167", saves: "892"
  }
];

export type KnAgent = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  city: string;
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
  followers: "128",
  following: "64",
  postCount: 0,
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  verified: false
};

export const knAgents: KnAgent[] = [
  { id: "a-jessica", name: "Jessica Moore", handle: "jessicamoore", bio: "Jersey City luxury. Private showings and skyline homes.", city: "Jersey City, NJ", followers: "24.1K", following: "412", postCount: 2, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", verified: true },
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
    image: "/images/yardpool.webp",
    price: "$4,250,000",
    address: "12 Grove Street",
    city: "Jersey City, NJ",
    beds: 5, baths: 4.5, sqft: "4,120",
    caption: "Just listed. Pool, PATH access, and a skyline you can have breakfast with.",
    likes: 8421,
    time: "2h",
    comments: [
      c("c1", "Alex Rivera", "alexrivera", knViewer.image, "That terrace is unreal. Private showing this week?", "1h"),
      c("c2", "Maya Carter", "jerseycityliving", knAgents[4].image, "Grove is going to move fast.", "48m")
    ]
  },
  {
    id: "post-washington",
    agentId: "a-michael",
    listingId: "hoboken-townhome",
    image: "/images/townliv1.webp",
    price: "$1,795,000",
    address: "214 Washington St",
    city: "Hoboken, NJ",
    beds: 3, baths: 2.5, sqft: "2,040",
    caption: "Open house Saturday 12–2. Brownstone light, new kitchen, two blocks to the PATH.",
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
    image: "/images/townliv2.webp",
    price: "$2,850,000",
    address: "88 Riverfront Ave",
    city: "Jersey City, NJ",
    beds: 3, baths: 3.5, sqft: "2,410",
    caption: "Newport glass, Hudson light, and a terrace that photographs itself.",
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
    image: "/images/townliv3.webp",
    price: "$879,000",
    address: "401 Marin Blvd",
    city: "Jersey City, NJ",
    beds: 2, baths: 2, sqft: "1,180",
    caption: "Price drop this morning. Two bed, two bath, walk to Grove Street PATH.",
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
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    price: "$1,795,000",
    address: "214 Kent Avenue",
    city: "Brooklyn, NY",
    beds: 2, baths: 2, sqft: "1,690",
    caption: "Williamsburg light. Clean lines, oversized windows, roof rights.",
    likes: 7440,
    time: "11h",
    comments: []
  },
  {
    id: "post-hudson-loft",
    agentId: "a-maya",
    listingId: "hudson-penthouse",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    price: "$2,850,000",
    address: "88 Riverfront Ave",
    city: "Jersey City, NJ",
    beds: 3, baths: 3.5, sqft: "2,410",
    caption: "Three bedrooms and a skyline terrace. This one deserves a save.",
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
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    price: "$1,225,000",
    address: "57 Hudson Street",
    city: "Hoboken, NJ",
    beds: 2, baths: 2, sqft: "1,420",
    caption: "Converted loft energy on Hudson Street. Walk to everything.",
    likes: 4108,
    time: "1d",
    comments: []
  },
  {
    id: "post-miami",
    agentId: "a-ava",
    listingId: "miami-waterfront",
    image: "/images/poolset.webp",
    price: "$4,950,000",
    address: "102 Bay Drive",
    city: "Miami Beach, FL",
    beds: 5, baths: 6, sqft: "4,880",
    caption: "Bay Drive. Private dock energy. Flying up Friday if anyone wants a walkthrough.",
    likes: 15602,
    time: "2d",
    comments: [
      c("c7", "Capricia Rivera", "capriciarivera", "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=80&q=80", "Send the floor plan when you can.", "1d")
    ]
  },
  {
    id: "post-loft-nyc",
    agentId: "a-noah",
    listingId: "brooklyn-modern",
    image: "/images/mountainset.webp",
    price: "$3,150,000",
    address: "41 Walker Street",
    city: "New York, NY",
    beds: 3, baths: 3, sqft: "2,880",
    caption: "Tribeca volume. Original columns, new glass, quiet block.",
    likes: 12880,
    time: "2d",
    comments: []
  },
  {
    id: "post-estate-2",
    agentId: "a-samantha",
    listingId: "jc-skyline-estate",
    image: "/images/yardpool.webp",
    price: "$4,250,000",
    address: "12 Grove Street",
    city: "Jersey City, NJ",
    beds: 5, baths: 4.5, sqft: "4,120",
    caption: "Golden hour from the pool house. Still available.",
    likes: 6701,
    time: "3d",
    comments: []
  },
  {
    id: "post-jessica-2",
    agentId: "a-jessica",
    listingId: "nyc-penthouse",
    image: "/images/townliv2.webp",
    price: "$2,850,000",
    address: "88 Riverfront Ave",
    city: "Jersey City, NJ",
    beds: 3, baths: 3.5, sqft: "2,410",
    caption: "Night view for the people who asked. 88 Riverfront still taking offers.",
    likes: 5304,
    time: "3d",
    comments: []
  }
];

export const knThreads: KnThread[] = [
  {
    id: "t-samantha",
    agentId: "a-samantha",
    preview: "I can do Grove Street at 5:30 tomorrow.",
    time: "12m",
    unread: true,
    messages: [
      { id: "m1", fromMe: true, text: "Is 12 Grove still available for a private showing?", time: "4:02 PM" },
      { id: "m2", fromMe: false, text: "Yes — I held it this week. Sending the listing.", time: "4:05 PM", listingId: "post-grove" },
      { id: "m3", fromMe: false, text: "I can do Grove Street at 5:30 tomorrow.", time: "4:06 PM" }
    ]
  },
  {
    id: "t-michael",
    agentId: "a-michael",
    preview: "Open house is Saturday 12–2.",
    time: "1h",
    unread: true,
    messages: [
      { id: "m4", fromMe: true, text: "Can I swing by 214 Washington this weekend?", time: "1:10 PM" },
      { id: "m5", fromMe: false, text: "Open house is Saturday 12–2. I’ll put you on the list.", time: "1:14 PM", listingId: "post-washington" }
    ]
  },
  {
    id: "t-jessica",
    agentId: "a-jessica",
    preview: "Riverfront terrace photos coming tonight.",
    time: "3h",
    unread: false,
    messages: [
      { id: "m6", fromMe: false, text: "Riverfront terrace photos coming tonight.", time: "11:20 AM" },
      { id: "m7", fromMe: true, text: "Please send the HOA packet too.", time: "11:41 AM" }
    ]
  },
  {
    id: "t-ava",
    agentId: "a-ava",
    preview: "Bay Drive walkthrough Friday 11am.",
    time: "1d",
    unread: false,
    messages: [
      { id: "m8", fromMe: true, text: "Any chance I can see 102 Bay Drive this week?", time: "Yesterday" },
      { id: "m9", fromMe: false, text: "Bay Drive walkthrough Friday 11am.", time: "Yesterday", listingId: "post-miami" }
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

export function knThreadById(id: string) {
  return knThreads.find(t => t.id === id);
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
    text: "confirmed a private showing at 12 Grove Street tomorrow 5:30.",
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
    text: "put you on the Saturday open-house list for 214 Washington St.",
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
