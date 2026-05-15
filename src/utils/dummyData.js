export const featuredHotels = [
  {
    id: 1,
    name: "Taj Mahal Palace",
    location: "Mumbai, India",
    price: 35000,
    rating: 4.9,
    reviews: 1280,
    image: "https://images.pexels.com/photos/34162312/pexels-photo-34162312.jpeg",
    category: "Luxury"
  },
  {
    id: 2,
    name: "Udaivilas Palace",
    location: "Udaipur, India",
    price: 30000,
    rating: 4.8,
    reviews: 842,
    image: "https://images.pexels.com/photos/33230286/pexels-photo-33230286.jpeg",
    category: "Luxury"
  },
  {
    id: 3,
    name: "Goa Beach Resort",
    location: "Goa, India",
    price: 18000,
    rating: 4.6,
    reviews: 589,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Beach"
  },
  {
    id: 4,
    name: "Himalayan Retreat",
    location: "Manali, India",
    price: 12000,
    rating: 4.7,
    reviews: 315,
    image: "https://images.pexels.com/photos/31776512/pexels-photo-31776512.jpeg",
    category: "Mountain"
  }
];

export const allHotels = [
  ...featuredHotels,
  {
    id: 5,
    name: "Bangalore Tech Hub Hotel",
    location: "Bangalore, India",
    price: 15000,
    rating: 4.5,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    category: "City",
    amenities: ["WiFi", "AC", "City View", "Gym"]
  },
  {
    id: 6,
    name: "Kerala Backwaters Resort",
    location: "Alleppey, India",
    price: 20000,
    rating: 4.9,
    reviews: 530,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Beach",
    amenities: ["WiFi", "AC", "Pool", "Spa"]
  }
];

export const categories = [
  { name: "Luxury", image: "/@fs/C:/Users/Santosh Madiwalar/.gemini/antigravity/brain/bff76fb5-e8e5-45e7-bdc0-39e845225bf2/luxury_category_bg_1777976651654.png" },
  { name: "Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80" },
  { name: "City", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" },
  { name: "Mountain", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" }
];
