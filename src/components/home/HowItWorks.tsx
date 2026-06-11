import { motion } from "framer-motion";
import { Search, ShoppingCart, Bike, Smile } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";

const steps = [
  {
    icon: Search,
    title: "Choose Food",
    desc: "Browse restaurants and pick your favourite dishes.",
  },
  {
    icon: ShoppingCart,
    title: "Place Order",
    desc: "Add to cart, apply a promo and check out securely.",
  },
  {
    icon: Bike,
    title: "Track Delivery",
    desc: "Watch your rider arrive in real-time on the map.",
  },
  {
    icon: Smile,
    title: "Enjoy Meal",
    desc: "Hot, fresh food delivered right to your door.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Simple Steps"
          title="How FoodHub Pro Works"
          subtitle="From craving to doorstep in four effortless steps."
        />
        <div className="relative mt-12 grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative grid h-18 w-18 place-items-center rounded-2xl bg-gradient-primary p-5 text-primary-foreground shadow-glow">
                <step.icon className="h-7 w-7" />
                <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-background bg-foreground text-xs font-bold text-background">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 max-w-[14rem] text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
