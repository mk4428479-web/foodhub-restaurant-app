import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { categories } from "../../data/foodData";
import { SectionHeading } from "../common/SectionHeading";

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Cravings?"
        title={<>Explore Popular Categories</>}
        subtitle="Whatever you're in the mood for, we've got a category packed with the best."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to="/menu"
              search={{ category: cat.id } as never}
              className="group flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-4 text-center shadow-soft hover-lift"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute -bottom-1 -right-1 text-xl">{cat.emoji}</span>
              </div>
              <div>
                <p className="text-sm font-bold">{cat.name}</p>
                <p className="text-[11px] text-muted-foreground">{cat.count} places</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
