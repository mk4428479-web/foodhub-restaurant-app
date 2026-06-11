import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, ChefHat, Package, Bike, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Order — FoodHub Pro" }] }),
  component: TrackPage,
});

const steps = [
  { icon: CheckCircle2, title: "Order Confirmed", desc: "We received your order." },
  { icon: ChefHat, title: "Preparing", desc: "The kitchen is cooking your meal." },
  { icon: Package, title: "Picked Up", desc: "Your rider has collected the order." },
  { icon: Bike, title: "On The Way", desc: "Your food is heading to you." },
  { icon: MapPin, title: "Delivered", desc: "Enjoy your meal! 🎉" },
];

function TrackPage() {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a < steps.length - 1 ? a + 1 : a)), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Track Your <span className="text-gradient">Order</span></h1>
        <p className="mt-2 text-muted-foreground">Order #FH-2048 • Estimated arrival in 12 min</p>
      </motion.div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="relative h-48 bg-mesh">
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              animate={{ x: [-60, 60, -60] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow"
            >
              <Bike className="h-8 w-8" />
            </motion.div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-1">
            {steps.map((step, i) => {
              const done = i <= active;
              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{ scale: i === active ? [1, 1.12, 1] : 1 }}
                      transition={{ repeat: i === active ? Infinity : 0, duration: 1.4 }}
                      className={`grid h-11 w-11 place-items-center rounded-full ${
                        done ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className={`h-10 w-0.5 ${i < active ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <div className={`pb-6 ${done ? "" : "opacity-50"}`}>
                    <p className="font-bold">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-between rounded-2xl bg-secondary/60 p-4">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/80?img=15" alt="rider" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-bold">Bilal R.</p>
                <p className="text-xs text-muted-foreground">Your delivery rider</p>
              </div>
            </div>
            <button className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <Link to="/menu" className="mt-6 block text-center text-sm font-semibold text-primary underline">
        Order something else
      </Link>
    </div>
  );
}
