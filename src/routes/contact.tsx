import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Building2,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — FoodHub Pro" },
      {
        name: "description",
        content:
          "Get in touch with the FoodHub Pro team. Questions, feedback, partnerships or support — we're here 24/7.",
      },
      { property: "og:title", content: "Contact FoodHub Pro" },
      {
        property: "og:description",
        content: "Reach our 24/7 support, partnerships and press teams.",
      },
    ],
  }),
  component: ContactPage,
});

const channels = [
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "Order issues, refunds & help",
    value: "support@foodhubpro.com",
  },
  {
    icon: Building2,
    title: "Partnerships",
    desc: "List your restaurant with us",
    value: "partners@foodhubpro.com",
  },
  {
    icon: MessageSquare,
    title: "Press & Media",
    desc: "Interviews and brand assets",
    value: "press@foodhubpro.com",
  },
];

const faqs = [
  {
    q: "How fast is delivery?",
    a: "Most orders arrive in under 30 minutes, depending on your location and the restaurant's prep time.",
  },
  {
    q: "Can I track my order live?",
    a: "Yes! Every order comes with real-time tracking from the kitchen to your doorstep.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We support cards, EasyPaisa, JazzCash and cash on delivery in most areas.",
  },
  {
    q: "How do I become a partner restaurant?",
    a: "Email partners@foodhubpro.com or use the form above and our team will reach out within 48 hours.",
  },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          We'd love to hear from you
        </span>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          Get in <span className="text-gradient">touch</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Whether it's a question, feedback or a partnership idea — our team is always ready.
        </p>
      </motion.div>

      {/* Channels */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {channels.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <c.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
            <p className="mt-3 text-sm font-semibold text-primary">{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Form + info */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <motion.form
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent! We'll get back to you within 24 hours. 🎉");
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-9"
        >
          <h2 className="text-2xl font-extrabold">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the form and we'll respond fast.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input
                required
                value={form.name}
                onChange={update("name")}
                placeholder="John Doe"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@email.com"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Subject">
              <input
                required
                value={form.subject}
                onChange={update("subject")}
                placeholder="How can we help?"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Message">
              <textarea
                required
                value={form.message}
                onChange={update("message")}
                rows={5}
                placeholder="Tell us a bit more..."
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Send message <Send className="h-4 w-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold">Visit our HQ</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  123 Gulberg Avenue, Lahore, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">hello@foodhubpro.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">Support available 24/7</span>
              </li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              title="FoodHub Pro location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=74.32%2C31.50%2C74.38%2C31.55&layer=mapnik"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* FAQ */}
      <section className="mx-auto mt-20 max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-bold"
              >
                {f.q}
                <span className="text-primary">{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-5 pb-4 text-sm text-muted-foreground"
                >
                  {f.a}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
