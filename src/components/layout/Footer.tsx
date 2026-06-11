import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  UtensilsCrossed,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: null },
      { label: "Partner With Us", to: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Menu", to: "/menu" },
      { label: "Offers", to: "/offers" },
      { label: "Flash Deals", to: "/offers" },
      { label: "Dashboard", to: "/dashboard" },
      { label: "Gift Cards", to: null },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/contact" },
      { label: "Track Order", to: "/track" },
      { label: "FAQs", to: "/contact" },
      { label: "Privacy Policy", to: null },
      { label: "Terms", to: null },
    ],
  },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border bg-card">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <UtensilsCrossed className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold">
                FoodHub<span className="text-gradient"> Pro</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Premium food delivery from 500+ top restaurants. Fresh, fast and always
              delicious — delivered to your door.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Lahore, Pakistan
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> +92 300 1234567
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> hello@foodhubpro.com
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-wider">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 rounded-3xl glass p-6 shadow-soft sm:p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-xl font-bold">Get exclusive deals 🍔</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Subscribe to our newsletter and never miss a flash deal.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("Subscribed! Watch your inbox for tasty deals 🎉");
              setEmail("");
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 w-full rounded-full border border-border bg-background px-5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="grid h-12 shrink-0 place-items-center rounded-full bg-gradient-primary px-5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FoodHub Pro. Crafted with ❤️ for food lovers.
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-gradient-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
