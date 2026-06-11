import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/home/Hero";
import { Stats } from "../components/home/Stats";
import { Categories } from "../components/home/Categories";
import { FeaturedRestaurants } from "../components/home/FeaturedRestaurants";
import { SpecialOffers } from "../components/home/SpecialOffers";
import { HowItWorks } from "../components/home/HowItWorks";
import { Testimonials } from "../components/home/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoodHub Pro — Premium Food Delivery, Delivered Fast" },
      {
        name: "description",
        content:
          "Order from 500+ top restaurants near you. Pizza, burgers, biryani & more, delivered in minutes with live tracking and exclusive flash deals.",
      },
      { property: "og:title", content: "FoodHub Pro — Premium Food Delivery" },
      {
        property: "og:description",
        content: "Crave it. Tap it. Delivered hot. The #1 food delivery experience.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedRestaurants />
      <SpecialOffers />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
