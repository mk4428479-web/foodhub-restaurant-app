import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { User, ShoppingBag, Heart, MapPin, Bell, Settings, Star, Trash2 } from "lucide-react";
import { useStore } from "../store/StoreProvider";
import { foods, restaurants } from "../data/foodData";
import { FoodCard } from "../components/food/FoodCard";
import { RestaurantCard } from "../components/food/RestaurantCard";
import { formatPrice, cn } from "../lib/format";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — FoodHub Pro" }] }),
  component: DashboardPage,
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

const orders = [
  { id: "FH-2048", items: "Pepperoni Pizza, Loaded Fries", total: 1498, status: "On the way", date: "Today" },
  { id: "FH-2041", items: "Chicken Biryani x2", total: 1098, status: "Delivered", date: "Yesterday" },
  { id: "FH-2033", items: "Double Smash Burger", total: 749, status: "Delivered", date: "2 days ago" },
];

function DashboardPage() {
  const [tab, setTab] = useState("profile");
  const { wishlist, recentlyViewed, favoriteRestaurants } = useStore();
  const wishedItems = foods.filter((f) => wishlist.includes(f.id));
  const viewedItems = recentlyViewed.map((id) => foods.find((f) => f.id === id)).filter(Boolean);
  const favRest = restaurants.filter((r) => favoriteRestaurants.includes(r.id));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28">
      <h1 className="text-3xl font-extrabold sm:text-4xl">My <span className="text-gradient">Dashboard</span></h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/80?img=47" alt="user" className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-bold">Ayesha Khan</p>
                <p className="text-xs text-muted-foreground">ayesha@foodhub.com</p>
              </div>
            </div>
            <nav className="mt-5 flex gap-2 overflow-x-auto no-scrollbar lg:flex-col">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                    tab === t.id ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-secondary",
                  )}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="min-h-[400px]">
          {tab === "profile" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Total Orders", value: "48", icon: ShoppingBag },
                  { label: "Wishlist Items", value: String(wishlist.length), icon: Heart },
                  { label: "Loyalty Points", value: "1,240", icon: Star },
                ].map((s) => (
                  <div key={s.label} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                    <s.icon className="h-6 w-6 text-primary" />
                    <p className="mt-3 text-2xl font-extrabold">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              {viewedItems.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold">Recently Viewed</h2>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {viewedItems.slice(0, 3).map((f, i) => f && <FoodCard key={f.id} item={f} index={i} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <div>
                    <p className="font-bold">#{o.id}</p>
                    <p className="text-sm text-muted-foreground">{o.items}</p>
                    <p className="text-xs text-muted-foreground">{o.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-bold", o.status === "Delivered" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary")}>
                      {o.status}
                    </span>
                    <p className="mt-1 font-bold">{formatPrice(o.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            wishedItems.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {wishedItems.map((f, i) => <FoodCard key={f.id} item={f} index={i} />)}
              </div>
            ) : <Empty text="Your wishlist is empty. Tap the heart on any dish!" />
          )}

          {tab === "addresses" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { tag: "Home", addr: "House 123, Block B, Gulberg III, Lahore" },
                { tag: "Office", addr: "5th Floor, Arfa Tower, Ferozepur Road, Lahore" },
              ].map((a) => (
                <div key={a.tag} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold"><MapPin className="h-4 w-4 text-primary" /> {a.tag}</span>
                    <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{a.addr}</p>
                </div>
              ))}
              {favRest.length > 0 && (
                <div className="sm:col-span-2">
                  <h2 className="mt-4 text-xl font-bold">Favourite Restaurants</h2>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {favRest.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-3">
              {[
                "🎉 Your order #FH-2048 is on the way!",
                "🔥 Flash Friday: 50% OFF all pizzas today.",
                "⭐ You earned 120 loyalty points.",
                "🍔 Burger Lab just added new items to their menu.",
              ].map((n, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Bell className="h-5 w-5" /></span>
                  <p className="text-sm font-medium">{n}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "settings" && (
            <div className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
              {["Email notifications", "SMS alerts", "Promotional offers", "Order updates"].map((s, i) => (
                <label key={s} className="flex items-center justify-between">
                  <span className="font-semibold">{s}</span>
                  <input type="checkbox" defaultChecked={i < 3} className="h-5 w-9 accent-[var(--primary)]" />
                </label>
              ))}
              <Link to="/" className="mt-2 inline-block rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold">Sign out</Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-border py-20 text-center">
      <span className="text-5xl">💔</span>
      <p className="mt-4 max-w-xs text-sm text-muted-foreground">{text}</p>
      <Link to="/menu" className="mt-4 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">Browse Menu</Link>
    </div>
  );
}
