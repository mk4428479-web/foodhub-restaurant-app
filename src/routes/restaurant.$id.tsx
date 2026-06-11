import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Bike, Star, Heart, MapPin, ArrowLeft } from "lucide-react";
import { restaurants, foods } from "../data/foodData";
import { FoodCard } from "../components/food/FoodCard";
import { RestaurantCard } from "../components/food/RestaurantCard";
import { useStore } from "../store/StoreProvider";
import { formatPrice, cn } from "../lib/format";

export const Route = createFileRoute("/restaurant/$id")({
  loader: ({ params }) => {
    const restaurant = restaurants.find((r) => r.id === params.id);
    if (!restaurant) throw notFound();
    return { restaurant };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.restaurant.name ?? "Restaurant"} — FoodHub Pro` },
      { name: "description", content: loaderData?.restaurant.cuisine ?? "" },
      { property: "og:image", content: loaderData?.restaurant.cover ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center pt-28 text-center">
      <div>
        <p className="text-2xl font-bold">Restaurant not found</p>
        <Link to="/menu" className="mt-4 inline-block text-primary underline">
          Back to menu
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-[60vh] place-items-center pt-28">Something went wrong.</div>
  ),
  component: RestaurantPage,
});

function RestaurantPage() {
  const { restaurant } = Route.useLoaderData();
  const { toggleFavRestaurant, favoriteRestaurants, markViewed } = useStore();
  const fav = favoriteRestaurants.includes(restaurant.id);
  const menu = foods.filter((f) => f.restaurantId === restaurant.id);
  const similar = restaurants.filter((r) => r.id !== restaurant.id).slice(0, 3);

  useEffect(() => {
    markViewed(restaurant.id);
  }, [restaurant.id]);

  return (
    <div>
      <div className="relative h-[44vh] min-h-[320px] w-full overflow-hidden">
        <img src={restaurant.cover} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <Link
          to="/menu"
          className="absolute left-4 top-24 flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold shadow-soft"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="mx-auto -mt-24 max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {restaurant.offer && (
                <span className="rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {restaurant.offer}
                </span>
              )}
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{restaurant.name}</h1>
              <p className="mt-1 text-muted-foreground">{restaurant.cuisine}</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> Gulberg, Lahore • Open now
              </p>
            </div>
            <button
              onClick={() => toggleFavRestaurant(restaurant.id)}
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background hover:bg-secondary"
            >
              <Heart className={cn("h-5 w-5", fav && "fill-primary text-primary")} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Star, label: `${restaurant.rating} Rating`, sub: `${restaurant.reviews} reviews` },
              { icon: Clock, label: restaurant.deliveryTime, sub: "Delivery time" },
              {
                icon: Bike,
                label: restaurant.deliveryFee === 0 ? "Free" : formatPrice(restaurant.deliveryFee),
                sub: "Delivery fee",
              },
              { icon: MapPin, label: formatPrice(restaurant.priceForTwo), sub: "For two" },
            ].map((item) => (
              <div
                key={item.sub}
                className="rounded-2xl bg-secondary/60 p-4 text-center"
              >
                <item.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-bold">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold">Menu</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((f, i) => (
              <FoodCard key={f.id} item={f} index={i} />
            ))}
          </div>
        </section>

        <section className="mt-14 pb-16">
          <h2 className="text-2xl font-extrabold">Similar Restaurants</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
