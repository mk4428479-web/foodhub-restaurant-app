import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Heart, Bike, Star } from "lucide-react";
import { useStore } from "../../store/StoreProvider";
import type { Restaurant } from "../../data/foodData";
import { formatPrice, cn } from "../../lib/format";

export function RestaurantCard({
  restaurant,
  index = 0,
}: {
  restaurant: Restaurant;
  index?: number;
}) {
  const { toggleFavRestaurant, favoriteRestaurants } = useStore();
  const fav = favoriteRestaurants.includes(restaurant.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link
        to="/restaurant/$id"
        params={{ id: restaurant.id }}
        className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover-lift"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {restaurant.offer && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-glow">
              {restaurant.offer}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavRestaurant(restaurant.id);
            }}
            aria-label="Favourite"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110"
          >
            <Heart className={cn("h-4 w-4", fav && "fill-primary text-primary")} />
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-bold backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {restaurant.rating}
            <span className="font-normal text-muted-foreground">
              ({restaurant.reviews.toLocaleString()})
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-bold">{restaurant.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{restaurant.cuisine}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-primary" /> {restaurant.deliveryTime}
            </span>
            <span className="flex items-center gap-1">
              <Bike className="h-3.5 w-3.5 text-primary" />
              {restaurant.deliveryFee === 0 ? "Free" : formatPrice(restaurant.deliveryFee)}
            </span>
            <span className="font-medium">{formatPrice(restaurant.priceForTwo)} for 2</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
