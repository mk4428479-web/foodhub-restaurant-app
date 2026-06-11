import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Search } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Food Stories, Tips & Trends | FoodHub Pro" },
      {
        name: "description",
        content:
          "Recipes, food trends, restaurant spotlights and delivery tips from the FoodHub Pro kitchen. Fresh reads for every food lover.",
      },
      { property: "og:title", content: "FoodHub Pro Blog" },
      {
        property: "og:description",
        content: "Food stories, recipes and trends from FoodHub Pro.",
      },
    ],
  }),
  component: BlogPage,
});

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const posts: Post[] = [
  {
    id: "1",
    title: "10 Street Foods You Have To Try This Winter",
    excerpt:
      "From sizzling chapli kebabs to gooey nutella samosas, here's our roundup of the most crave-worthy bites of the season.",
    category: "Food Trends",
    author: "Sara Malik",
    date: "Jun 6, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80",
  },
  {
    id: "2",
    title: "How We Keep Your Food Hot For 28 Minutes Flat",
    excerpt:
      "A peek behind the curtain at the logistics, insulated packaging and smart routing that powers every FoodHub Pro delivery.",
    category: "Behind The Scenes",
    author: "Bilal Ahmed",
    date: "Jun 2, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&q=80",
  },
  {
    id: "3",
    title: "The Ultimate Guide To Ordering Biryani Online",
    excerpt:
      "Spice levels, raita pairings and the best-kept biryani spots in town — everything you need for the perfect plate.",
    category: "Guides",
    author: "Hamza Tariq",
    date: "May 28, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=80",
  },
  {
    id: "4",
    title: "5 Cozy Comfort Foods For A Rainy Day",
    excerpt:
      "When the clouds roll in, these warm, soul-soothing dishes are exactly what your evening needs.",
    category: "Recipes",
    author: "Ayesha Khan",
    date: "May 21, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80",
  },
  {
    id: "5",
    title: "Meet The Restaurants Behind Your Favourite Pizza",
    excerpt:
      "We sat down with three of our top pizza partners to talk dough, wood-fired ovens and the secret to the perfect slice.",
    category: "Spotlights",
    author: "Sara Malik",
    date: "May 14, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80",
  },
  {
    id: "6",
    title: "Healthy Takeout: It's Easier Than You Think",
    excerpt:
      "Smart swaps and high-protein picks that prove ordering in doesn't have to derail your goals.",
    category: "Guides",
    author: "Bilal Ahmed",
    date: "May 8, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80",
  },
];

const categories = ["All", "Food Trends", "Recipes", "Guides", "Spotlights"];

function BlogPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = posts.filter((p) => {
    const byCat = active === "All" || p.category === active;
    const bySearch = p.title.toLowerCase().includes(query.toLowerCase());
    return byCat && bySearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          The Foodie Journal
        </span>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          Stories from the <span className="text-gradient">kitchen</span>
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Recipes, trends and the people that make every order delicious.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === c
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "border border-border bg-card text-foreground/70 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No articles found. Try a different search.
        </p>
      )}

      {/* Featured */}
      {featured && (
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-card lg:grid-cols-2"
        >
          <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {featured.category}
            </span>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">{featured.title}</h2>
            <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{featured.author}</span>
              <span>·</span>
              <span>{featured.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {featured.readTime}
              </span>
            </div>
            <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105">
              Read article <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.article>
      )}

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {p.category}
              </span>
              <h3 className="mt-3 text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{p.author}</span>
                <span>·</span>
                <span>{p.date}</span>
                <span className="ml-auto flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {p.readTime}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-16 rounded-[2rem] bg-gradient-primary px-6 py-12 text-center text-primary-foreground shadow-glow sm:px-12">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Never miss a tasty read</h2>
        <p className="mx-auto mt-2 max-w-md text-white/90">
          Get our best recipes and food stories delivered weekly.
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-foreground transition-transform hover:scale-105"
        >
          Explore the menu <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
