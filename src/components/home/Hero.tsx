import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Star, Clock, ArrowRight, Bike } from "lucide-react";

const floatingCards = [
  {
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    label: "Pepperoni Pizza",
    sub: "Rs.1099",
    className: "left-0 top-8",
    delay: 0,
  },
  {
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
    label: "Smash Burger",
    sub: "Rs.749",
    className: "right-0 top-24",
    delay: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80",
    label: "Chicken Biryani",
    sub: "Rs.549",
    className: "bottom-4 left-10",
    delay: 0.5,
  },
];

export function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-mesh pb-16 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold shadow-soft"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            #1 Food Delivery in Pakistan
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-6xl"
          >
            Crave it. Tap it.
            <br />
            <span className="text-gradient">Delivered hot.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-md text-lg text-muted-foreground"
          >
            Order from 500+ top restaurants near you. Pizza, burgers, biryani & more —
            delivered in minutes with live tracking.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/menu", search: { q: query } as never });
            }}
            className="mt-7 flex items-center gap-2 rounded-full glass p-2 shadow-soft"
          >
            <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search food, restaurants, cuisines…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Search
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link
              to="/menu"
              className="flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Order Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/menu"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-bold transition-colors hover:bg-secondary"
            >
              Explore Restaurants
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center gap-5 text-sm"
          >
            <div className="flex -space-x-3">
              {[47, 12, 32, 15].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/80?img=${i}`}
                  alt="customer"
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 font-bold">
                <Star className="h-4 w-4 fill-gold text-gold" /> 4.9/5
              </div>
              <p className="text-xs text-muted-foreground">10,000+ happy customers</p>
            </div>
          </motion.div>
        </div>

        <div className="relative hidden h-[480px] lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-primary opacity-20 blur-2xl animate-spin-slow" />
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80"
              alt="Delicious food"
              className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-background object-cover shadow-card animate-float-slow"
            />
          </motion.div>

          {floatingCards.map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + card.delay * 0.2 }}
              className={`absolute ${card.className} flex items-center gap-3 rounded-2xl glass p-3 shadow-card animate-float`}
              style={{ animationDelay: `${card.delay}s` }}
            >
              <img src={card.img} alt={card.label} className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <p className="text-xs font-bold">{card.label}</p>
                <p className="text-xs font-semibold text-primary">{card.sub}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-16 right-2 flex items-center gap-3 rounded-2xl glass p-3 shadow-card animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
              <Bike className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold">On the way!</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> 12 min away
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
