import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CreditCard, Wallet, Banknote, Check, ArrowLeft } from "lucide-react";
import { useStore } from "../store/StoreProvider";
import { formatPrice, cn } from "../lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — FoodHub Pro" }] }),
  component: CheckoutPage,
});

const payments = [
  { id: "easypaisa", label: "EasyPaisa", icon: Wallet },
  { id: "jazzcash", label: "JazzCash", icon: Wallet },
  { id: "visa", label: "Visa", icon: CreditCard },
  { id: "mastercard", label: "Mastercard", icon: CreditCard },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];

function CheckoutPage() {
  const { cart, totals, clearCart } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");

  if (cart.length === 0) {
    return (
      <div className="grid min-h-[60vh] place-items-center pt-28 text-center">
        <div>
          <span className="text-5xl">🛒</span>
          <p className="mt-4 text-xl font-bold">Your cart is empty</p>
          <Link to="/menu" className="mt-4 inline-block rounded-full bg-gradient-primary px-6 py-2.5 font-semibold text-primary-foreground shadow-glow">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28">
      <Link to="/menu" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Checkout</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Order placed successfully! 🎉");
          clearCart();
          navigate({ to: "/track" });
        }}
        className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Delivery Address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" placeholder="Ali Khan" required />
              <Field label="Phone" placeholder="+92 300 1234567" required />
              <div className="sm:col-span-2">
                <Field label="Address" placeholder="House 123, Street 4, Block B" required />
              </div>
              <Field label="City" placeholder="Lahore" required />
              <Field label="Postal Code" placeholder="54000" />
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Payment Method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {payments.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPayment(p.id)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-colors",
                    payment === p.id ? "border-primary bg-primary/5" : "border-border bg-background",
                  )}
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <p.icon className="h-5 w-5 text-primary" /> {p.label}
                  </span>
                  {payment === p.id && (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <div className="mt-4 space-y-3 max-h-60 overflow-y-auto no-scrollbar">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <img src={c.image} alt={c.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-tight">{c.name}</p>
                    <p className="text-xs text-muted-foreground">x{c.qty}</p>
                  </div>
                  <span className="text-sm font-bold">{formatPrice(c.price * c.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
              <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
              {totals.discount > 0 && <Row label="Discount" value={`- ${formatPrice(totals.discount)}`} />}
              <Row label="Delivery" value={totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)} />
              <Row label="Tax" value={formatPrice(totals.tax)} />
              <div className="flex justify-between border-t border-dashed border-border pt-2 text-base font-extrabold">
                <span>Total</span>
                <span className="text-gradient">{formatPrice(totals.total)}</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="mt-5 w-full rounded-full bg-gradient-primary py-3.5 font-bold text-primary-foreground shadow-glow"
            >
              Place Order • {formatPrice(totals.total)}
            </motion.button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input
        {...props}
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
