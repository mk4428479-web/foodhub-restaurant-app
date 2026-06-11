import { motion } from "framer-motion";
import { Heart, Plus, Star } from "lucide-react";
import { useStore } from "../../store/StoreProvider";
import type { FoodItem } from "../../data/foodData";
import { formatPrice, cn } from "../../lib/format";

export function FoodCard({ item, index = 0 }: { item: FoodItem; index?: number }) {
  const { addToCart, toggleWish, wishlist } = useStore();
  const wished = wishlist.includes(item.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-col gap-1.5">
            {item.popular && (
              <span className="rounded-full bg-gradient-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-glow">
                🔥 Popular
              </span>
            )}
            {item.oldPrice && (
              <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold text-background">
                {Math.round((1 - item.price / item.oldPrice) * 100)}% OFF
              </span>
            )}
          </div>
          <button
            onClick={() => toggleWish(item.id)}
            aria-label="Add to wishlist"
            className="grid h-9 w-9 place-items-center rounded-full glass text-foreground transition-transform hover:scale-110"
          >
            <Heart className={cn("h-4 w-4", wished && "fill-primary text-primary")} />
          </button>
        </div>
        {item.veg !== undefined && (
          <span className="absolute bottom-3 left-3 grid h-5 w-5 place-items-center rounded border-2 border-white/80 bg-black/30">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                item.veg ? "bg-emerald-400" : "bg-red-500",
              )}
            />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-tight">{item.name}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
            <Star className="h-3 w-3 fill-accent" /> {item.rating}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        <p className="mt-1 text-[11px] font-medium text-muted-foreground">
          {item.restaurantName}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-primary">
              {formatPrice(item.price)}
            </span>
            {item.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(item.oldPrice)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(item)}
            className="flex items-center gap-1 rounded-full bg-gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
