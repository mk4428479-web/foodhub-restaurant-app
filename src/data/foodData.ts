export interface Category {
  id: string;
  name: string;
  emoji: string;
  image: string;
  count: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cover: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: number;
  priceForTwo: number;
  offer?: string;
  tags: string[];
  featured?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  restaurantId: string;
  restaurantName: string;
  popular?: boolean;
  veg?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  { id: "pizza", name: "Pizza", emoji: "🍕", image: img("1513104890138-7c749659a591"), count: 86 },
  { id: "burger", name: "Burger", emoji: "🍔", image: img("1568901346375-23c9450c58cd"), count: 124 },
  { id: "biryani", name: "Biryani", emoji: "🍛", image: img("1563379091339-03b21ab4a4f8"), count: 64 },
  { id: "bbq", name: "BBQ", emoji: "🍖", image: img("1529193591184-b1d58069ecdd"), count: 52 },
  { id: "chinese", name: "Chinese", emoji: "🥡", image: img("1585032226651-759b368d7246"), count: 78 },
  { id: "fastfood", name: "Fast Food", emoji: "🍟", image: img("1550547660-d9450f859349"), count: 142 },
  { id: "desserts", name: "Desserts", emoji: "🍰", image: img("1488477181946-6428a0291777"), count: 96 },
  { id: "drinks", name: "Drinks", emoji: "🥤", image: img("1437418747212-8d9709afab22"), count: 58 },
];

export const restaurants: Restaurant[] = [
  {
    id: "the-pizza-republic",
    name: "The Pizza Republic",
    image: img("1513104890138-7c749659a591", 600),
    cover: img("1565299624946-b28f40a0ae38", 1400),
    cuisine: "Italian • Pizza • Pasta",
    rating: 4.9,
    reviews: 2340,
    deliveryTime: "25-30 min",
    deliveryFee: 0,
    priceForTwo: 1200,
    offer: "50% OFF up to Rs.500",
    tags: ["pizza", "fastfood"],
    featured: true,
  },
  {
    id: "burger-lab",
    name: "Burger Lab",
    image: img("1568901346375-23c9450c58cd", 600),
    cover: img("1572802419224-296b0aeee0d9", 1400),
    cuisine: "American • Burgers • Fries",
    rating: 4.8,
    reviews: 3120,
    deliveryTime: "20-25 min",
    deliveryFee: 49,
    priceForTwo: 900,
    offer: "Free delivery",
    tags: ["burger", "fastfood"],
    featured: true,
  },
  {
    id: "biryani-house",
    name: "Royal Biryani House",
    image: img("1563379091339-03b21ab4a4f8", 600),
    cover: img("1631515243349-e0cb75fb8d3a", 1400),
    cuisine: "Pakistani • Biryani • Desi",
    rating: 4.9,
    reviews: 4510,
    deliveryTime: "30-40 min",
    deliveryFee: 0,
    priceForTwo: 800,
    offer: "Buy 1 Get 1 Free",
    tags: ["biryani", "bbq"],
    featured: true,
  },
  {
    id: "smoke-bbq",
    name: "Smoke & Grill BBQ",
    image: img("1529193591184-b1d58069ecdd", 600),
    cover: img("1544025162-d76694265947", 1400),
    cuisine: "BBQ • Grill • Steaks",
    rating: 4.7,
    reviews: 1890,
    deliveryTime: "35-45 min",
    deliveryFee: 99,
    priceForTwo: 1500,
    offer: "20% OFF",
    tags: ["bbq"],
    featured: true,
  },
  {
    id: "dragon-wok",
    name: "Dragon Wok",
    image: img("1585032226651-759b368d7246", 600),
    cover: img("1525755662778-989d0524087e", 1400),
    cuisine: "Chinese • Asian • Noodles",
    rating: 4.6,
    reviews: 1450,
    deliveryTime: "25-35 min",
    deliveryFee: 49,
    priceForTwo: 1000,
    offer: "Flat Rs.200 OFF",
    tags: ["chinese", "fastfood"],
    featured: true,
  },
  {
    id: "sweet-cravings",
    name: "Sweet Cravings",
    image: img("1488477181946-6428a0291777", 600),
    cover: img("1505250469679-203ad9ced0cb", 1400),
    cuisine: "Desserts • Bakery • Cakes",
    rating: 4.9,
    reviews: 2670,
    deliveryTime: "20-30 min",
    deliveryFee: 0,
    priceForTwo: 600,
    offer: "Free brownie",
    tags: ["desserts", "drinks"],
    featured: true,
  },
];

const restName = (id: string) => restaurants.find((r) => r.id === id)?.name ?? "";

export const foods: FoodItem[] = [
  {
    id: "f1",
    name: "Pepperoni Supreme",
    description: "Loaded pepperoni, mozzarella & house tomato sauce on hand-tossed crust.",
    image: img("1628840042765-356cda07504e"),
    price: 1099,
    oldPrice: 1499,
    rating: 4.9,
    reviews: 820,
    category: "pizza",
    restaurantId: "the-pizza-republic",
    restaurantName: restName("the-pizza-republic"),
    popular: true,
  },
  {
    id: "f2",
    name: "Truffle Margherita",
    description: "Fresh basil, buffalo mozzarella and a drizzle of truffle oil.",
    image: img("1574071318508-1cdbab80d002"),
    price: 999,
    rating: 4.8,
    reviews: 540,
    category: "pizza",
    restaurantId: "the-pizza-republic",
    restaurantName: restName("the-pizza-republic"),
    veg: true,
  },
  {
    id: "f3",
    name: "Double Smash Burger",
    description: "Two juicy beef patties, melted cheddar, caramelised onions & lab sauce.",
    image: img("1568901346375-23c9450c58cd"),
    price: 749,
    oldPrice: 999,
    rating: 4.9,
    reviews: 1320,
    category: "burger",
    restaurantId: "burger-lab",
    restaurantName: restName("burger-lab"),
    popular: true,
  },
  {
    id: "f4",
    name: "Crispy Zinger Burger",
    description: "Buttermilk fried chicken fillet with spicy mayo & fresh lettuce.",
    image: img("1606755962773-d324e0a13086"),
    price: 599,
    rating: 4.7,
    reviews: 760,
    category: "burger",
    restaurantId: "burger-lab",
    restaurantName: restName("burger-lab"),
  },
  {
    id: "f5",
    name: "Chicken Dum Biryani",
    description: "Aromatic basmati rice slow-cooked with tender chicken & royal spices.",
    image: img("1563379091339-03b21ab4a4f8"),
    price: 549,
    oldPrice: 699,
    rating: 4.9,
    reviews: 2100,
    category: "biryani",
    restaurantId: "biryani-house",
    restaurantName: restName("biryani-house"),
    popular: true,
  },
  {
    id: "f6",
    name: "Mutton Biryani",
    description: "Fall-off-the-bone mutton layered with fragrant saffron rice.",
    image: img("1589302168068-964664d93dc0"),
    price: 749,
    rating: 4.8,
    reviews: 980,
    category: "biryani",
    restaurantId: "biryani-house",
    restaurantName: restName("biryani-house"),
  },
  {
    id: "f7",
    name: "Smoked BBQ Platter",
    description: "Assorted grilled meats, seekh kebab, malai boti & fresh naan.",
    image: img("1529193591184-b1d58069ecdd"),
    price: 1399,
    oldPrice: 1799,
    rating: 4.8,
    reviews: 640,
    category: "bbq",
    restaurantId: "smoke-bbq",
    restaurantName: restName("smoke-bbq"),
    popular: true,
  },
  {
    id: "f8",
    name: "Chicken Tikka Boti",
    description: "Char-grilled marinated chicken chunks with mint chutney.",
    image: img("1599487488170-d11ec9c172f0"),
    price: 699,
    rating: 4.7,
    reviews: 420,
    category: "bbq",
    restaurantId: "smoke-bbq",
    restaurantName: restName("smoke-bbq"),
  },
  {
    id: "f9",
    name: "Schezwan Noodles",
    description: "Wok-tossed noodles with veggies in fiery schezwan sauce.",
    image: img("1585032226651-759b368d7246"),
    price: 499,
    rating: 4.6,
    reviews: 510,
    category: "chinese",
    restaurantId: "dragon-wok",
    restaurantName: restName("dragon-wok"),
    veg: true,
    popular: true,
  },
  {
    id: "f10",
    name: "Honey Chilli Chicken",
    description: "Crispy chicken glazed in sweet & spicy honey chilli sauce.",
    image: img("1603073163308-9654c3fb70b5"),
    price: 649,
    oldPrice: 849,
    rating: 4.7,
    reviews: 380,
    category: "chinese",
    restaurantId: "dragon-wok",
    restaurantName: restName("dragon-wok"),
  },
  {
    id: "f11",
    name: "Loaded Fries",
    description: "Crispy fries topped with cheese sauce, jalapeños & herbs.",
    image: img("1573080496219-bb080dd4f877"),
    price: 399,
    rating: 4.6,
    reviews: 690,
    category: "fastfood",
    restaurantId: "burger-lab",
    restaurantName: restName("burger-lab"),
    veg: true,
  },
  {
    id: "f12",
    name: "Molten Chocolate Cake",
    description: "Warm chocolate lava cake with a gooey centre & vanilla scoop.",
    image: img("1606313564200-e75d5e30476c"),
    price: 349,
    oldPrice: 499,
    rating: 4.9,
    reviews: 1120,
    category: "desserts",
    restaurantId: "sweet-cravings",
    restaurantName: restName("sweet-cravings"),
    popular: true,
    veg: true,
  },
  {
    id: "f13",
    name: "New York Cheesecake",
    description: "Creamy baked cheesecake with a buttery biscuit base & berry compote.",
    image: img("1533134242443-d4fd215305ad"),
    price: 449,
    rating: 4.8,
    reviews: 540,
    category: "desserts",
    restaurantId: "sweet-cravings",
    restaurantName: restName("sweet-cravings"),
    veg: true,
  },
  {
    id: "f14",
    name: "Mango Smoothie",
    description: "Thick alphonso mango smoothie blended with yoghurt & honey.",
    image: img("1623065422902-30a2d299bbe4"),
    price: 299,
    rating: 4.7,
    reviews: 260,
    category: "drinks",
    restaurantId: "sweet-cravings",
    restaurantName: restName("sweet-cravings"),
    veg: true,
  },
  {
    id: "f15",
    name: "Cold Brew Coffee",
    description: "Slow-steeped 18-hour cold brew over ice with a hint of caramel.",
    image: img("1461023058943-07fcbe16d735"),
    price: 349,
    rating: 4.6,
    reviews: 310,
    category: "drinks",
    restaurantId: "sweet-cravings",
    restaurantName: restName("sweet-cravings"),
    veg: true,
  },
  {
    id: "f16",
    name: "BBQ Chicken Pizza",
    description: "Smoky BBQ sauce, grilled chicken, onions & a cheese blend.",
    image: img("1565299624946-b28f40a0ae38"),
    price: 1199,
    oldPrice: 1599,
    rating: 4.8,
    reviews: 470,
    category: "pizza",
    restaurantId: "the-pizza-republic",
    restaurantName: restName("the-pizza-republic"),
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ayesha Khan",
    role: "Food Blogger",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    text: "FoodHub Pro is hands down the smoothest delivery app I've used. The live tracking is spot on and food always arrives hot!",
  },
  {
    id: "t2",
    name: "Daniyal Ahmed",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "The flash deals saved me so much money. Ordering biryani for the whole team has never been this effortless.",
  },
  {
    id: "t3",
    name: "Hira Malik",
    role: "Designer",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    text: "Beautiful interface and lightning-fast delivery. I love the wishlist feature for saving my favourite restaurants.",
  },
  {
    id: "t4",
    name: "Bilal Raza",
    role: "Entrepreneur",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    text: "From browsing to checkout everything just works. Multiple payment options including EasyPaisa is a huge plus.",
  },
];

export const offers = [
  {
    id: "o1",
    title: "Flash Friday",
    discount: "50% OFF",
    description: "On all pizzas this Friday only. Use code FLASH50.",
    code: "FLASH50",
    color: "from-orange-500 to-rose-500",
    expiresIn: "Ends in 04:12:33",
  },
  {
    id: "o2",
    title: "Free Delivery Week",
    discount: "Rs.0",
    description: "Zero delivery fee on orders above Rs.999.",
    code: "FREEDEL",
    color: "from-emerald-500 to-teal-500",
    expiresIn: "Ends in 2 days",
  },
  {
    id: "o3",
    title: "Combo Mania",
    discount: "BUY 1 GET 1",
    description: "Buy one biryani, get one absolutely free.",
    code: "BOGO",
    color: "from-violet-500 to-fuchsia-500",
    expiresIn: "Limited time",
  },
];

export const promoCodes: Record<string, number> = {
  FLASH50: 0.5,
  FREEDEL: 0,
  BOGO: 0.3,
  WELCOME10: 0.1,
};
