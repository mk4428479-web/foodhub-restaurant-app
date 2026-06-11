import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { foods, categories } from "../data/foodData";
import { FoodCard } from "../components/food/FoodCard";
import { formatPrice, cn } from "../lib/format";

export const Route = createFileRoute("/menu")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: (s.q as string) || "",
    category: (s.category as string) || "all",
  }),
  head: () => ({
    meta: [
      { title: "Food Menu — FoodHub Pro" },
      { name: "description", content: "Browse our full menu with advanced search and filters." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const search = Route.useSearch();
  const [query, setQuery] = useState(search.q);
  const [category, setCategory] = useState(search.category);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let list = foods.filter((f) => {
      const matchQ =
        !query ||
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.description.toLowerCase().includes(query.toLowerCase()) ||
        f.restaurantName.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === "all" || f.category === category;
      const matchPrice = f.price <= maxPrice;
      return matchQ && matchCat && matchPrice;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "popular")
      list = [...list].sort((a, b) => Number(b.popular) - Number(a.popular));
    return list;
  }, [query, category, maxPrice, sort]);

  return (
    <div className="pt-28">
      <div className="bg-mesh">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold sm:text-5xl"
          >
            Explore the <span className="text-gradient">Menu</span>
          </motion.h1>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} delicious dishes ready to be devoured.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-full glass p-2 shadow-soft">
            <Search className="ml-3 h-5 w-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, restaurants…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <h3 className="flex items-center gap-2 text-sm font-bold">
                <SlidersHorizontal className="h-4 w-4 text-primary" /> Categories
              </h3>
              <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
                {[{ id: "all", name: "All Items", emoji: "🍽️" }, ...categories].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      category === c.id
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "bg-secondary text-foreground/80 hover:bg-secondary/70",
                    )}
                  >
                    <span>{c.emoji}</span> {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <h3 className="text-sm font-bold">Max Price</h3>
              <input
                type="range"
                min={200}
                max={1500}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--primary)]"
              />
              <p className="mt-2 text-sm font-semibold text-primary">
                Up to {formatPrice(maxPrice)}
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <h3 className="text-sm font-bold">Sort By</h3>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="grid place-items-center rounded-3xl border border-dashed border-border py-20 text-center">
                <span className="text-5xl">🍳</span>
                <p className="mt-4 text-lg font-bold">No dishes found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((f, i) => (
                  <FoodCard key={f.id} item={f} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
