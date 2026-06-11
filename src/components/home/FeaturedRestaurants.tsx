import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { restaurants } from "../../data/foodData";
import { SectionHeading } from "../common/SectionHeading";
import { RestaurantCard } from "../food/RestaurantCard";

export function FeaturedRestaurants() {
  const featured = restaurants.filter((r) => r.featured);
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          align="left"
          eyebrow="Top Rated"
          title="Featured Restaurants"
          subtitle="Hand-picked favourites loved by thousands of foodies."
        >
          <Link
            to="/menu"
            className="flex items-center gap-1 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionHeading>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r, i) => (
            <RestaurantCard key={r.id} restaurant={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
