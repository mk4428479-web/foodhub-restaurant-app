import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../../data/foodData";
import { SectionHeading } from "../common/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Loved by foodies"
        title="What Our Customers Say"
        subtitle="Real reviews from thousands of satisfied food lovers."
      />
      <div className="relative mx-auto mt-10 max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
          <Quote className="h-10 w-10 text-primary/30" />
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mt-4 text-lg font-medium leading-relaxed sm:text-xl">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-14 w-14 rounded-full border-2 border-primary object-cover"
                />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => go(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gradient-primary" : "w-2.5 bg-border"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
