import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Rocket,
  Heart,
  Leaf,
  ShieldCheck,
  Clock,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — FoodHub Pro" },
      {
        name: "description",
        content:
          "The story behind FoodHub Pro — our mission to deliver premium food experiences from 500+ restaurants with speed, care and quality.",
      },
      { property: "og:title", content: "About FoodHub Pro" },
      {
        property: "og:description",
        content: "Meet the team and mission powering premium food delivery.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Rocket,
    title: "Lightning Fast",
    desc: "Smart routing and a 12,000+ rider fleet get hot food to you in record time.",
  },
  {
    icon: Leaf,
    title: "Always Fresh",
    desc: "We partner only with kitchens that meet our strict freshness and hygiene bar.",
  },
  {
    icon: ShieldCheck,
    title: "Trust First",
    desc: "Secure payments, transparent pricing and live tracking on every single order.",
  },
  {
    icon: Heart,
    title: "Crafted With Love",
    desc: "From the app to the packaging, every detail is designed to delight foodies.",
  },
];

const stats = [
  { icon: Users, value: "2.4M+", label: "Happy customers" },
  { icon: Award, value: "500+", label: "Partner restaurants" },
  { icon: Clock, value: "28 min", label: "Avg. delivery time" },
  { icon: Rocket, value: "60+", label: "Cities served" },
];

const team = [
  {
    name: "Ayesha Khan",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Bilal Ahmed",
    role: "Head of Operations",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Sara Malik",
    role: "Lead Product Designer",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Hamza Tariq",
    role: "Chief Technology Officer",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
];

const timeline = [
  { year: "2021", title: "The first order", desc: "FoodHub Pro launched in Lahore with just 15 restaurants." },
  { year: "2022", title: "Going national", desc: "Expanded to 20 cities and crossed 100k orders a month." },
  { year: "2024", title: "Half a million strong", desc: "500+ partner restaurants and a 12k rider fleet onboard." },
  { year: "2026", title: "The premium era", desc: "Re-imagined experience, live tracking and AI recommendations." },
];

function AboutPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary px-6 py-16 text-primary-foreground shadow-glow sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
              We make great food travel beautifully.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/90 sm:text-lg">
              FoodHub Pro started with a simple frustration — good food arriving cold and
              late. Today we're a craft-obsessed delivery platform connecting millions of
              hungry people to the kitchens they love.
            </p>
            <Link
              to="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-foreground transition-transform hover:scale-105"
            >
              Explore the menu <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <p className="mt-4 text-3xl font-extrabold text-gradient">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission + image */}
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Our <span className="text-gradient">mission</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              To make every meal feel like it was made for you — fresh, fast and full of
              care. We obsess over the details most platforms ignore: insulated packaging,
              honest pricing, and riders we treat like partners.
            </p>
            <p className="mt-4 text-muted-foreground">
              We believe food is connection. Whether it's a midnight craving or a family
              feast, we want to be the most delightful way to get it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["No hidden fees", "Live order tracking", "24/7 support"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2rem] shadow-card"
          >
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80"
              alt="Chefs preparing fresh food in a modern kitchen"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            What we <span className="text-gradient">stand for</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Four principles guide every decision we make.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto mt-20 max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Our <span className="text-gradient">journey</span>
          </h2>
        </div>
        <div className="mt-10 space-y-6">
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-lg font-extrabold text-primary">
                {t.year}
              </span>
              <div>
                <h3 className="text-lg font-bold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Meet the <span className="text-gradient">team</span>
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            The people obsessing over your next great meal.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-bold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="rounded-[2rem] border border-border bg-card p-10 text-center shadow-soft sm:p-14">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Hungry yet?</h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Join millions who order their favourites on FoodHub Pro every day.
          </p>
          <Link
            to="/menu"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Order now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
