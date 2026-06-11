import { motion } from "framer-motion";
import { toast } from "sonner";
import { Copy, Clock, Zap } from "lucide-react";
import { offers } from "../../data/foodData";
import { SectionHeading } from "../common/SectionHeading";

export function SpecialOffers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Limited Time"
        title="Flash Deals & Special Offers"
        subtitle="Grab these sizzling deals before the timer runs out."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${offer.color} p-6 text-white shadow-card`}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" />
            <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10" />
            <div className="relative">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                <Zap className="h-3.5 w-3.5" /> {offer.title}
              </span>
              <h3 className="mt-4 text-4xl font-extrabold drop-shadow">{offer.discount}</h3>
              <p className="mt-2 text-sm text-white/90">{offer.description}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-white/90">
                <Clock className="h-3.5 w-3.5" /> {offer.expiresIn}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(offer.code);
                  toast.success(`Code ${offer.code} copied!`);
                }}
                className="mt-5 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-foreground transition-transform hover:scale-105"
              >
                <Copy className="h-4 w-4" /> Copy code: {offer.code}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
