import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50000, suffix: "+", label: "Orders Delivered", icon: "📦" },
  { value: 10000, suffix: "+", label: "Happy Customers", icon: "😋" },
  { value: 500, suffix: "+", label: "Restaurants", icon: "🍴" },
  { value: 4.9, suffix: "", label: "Average Rating", icon: "⭐", decimal: true },
];

function Counter({ value, decimal }: { value: number; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {decimal ? n.toFixed(1) : Math.floor(n).toLocaleString()}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto -mt-6 max-w-7xl px-4">
      <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl">{s.icon}</div>
            <div className="mt-2 text-3xl font-extrabold text-gradient sm:text-4xl">
              <Counter value={s.value} decimal={s.decimal} />
              {s.suffix}
            </div>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
