import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Copy, Clock, Zap, ArrowRight } from "lucide-react";
import { offers } from "../data/foodData";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Special Offers & Flash Deals — FoodHub Pro" },
      { name: "description", content: "Save big with flash deals and limited-time offers." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Hot <span className="text-gradient">Deals</span> & Offers
        </h1>
        <p className="mt-2 text-muted-foreground">
          Don't miss out — these limited-time offers are flying off the menu.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${offer.color} p-7 text-white shadow-card`}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
              <Zap className="h-3.5 w-3.5" /> {offer.title}
            </span>
            <h3 className="mt-4 text-4xl font-extrabold">{offer.discount}</h3>
            <p className="mt-2 text-sm text-white/90">{offer.description}</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold">
              <Clock className="h-3.5 w-3.5" /> {offer.expiresIn}
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(offer.code);
                toast.success(`Code ${offer.code} copied!`);
              }}
              className="mt-5 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-foreground"
            >
              <Copy className="h-4 w-4" /> {offer.code}
            </button>
          </motion.div>
        ))}
      </div>

      <Link
        to="/menu"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-glow"
      >
        Order with these deals <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
