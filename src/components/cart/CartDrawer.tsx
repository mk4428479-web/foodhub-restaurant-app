import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { useStore } from "../../store/StoreProvider";
import { formatPrice } from "../../lib/format";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    setQty,
    removeFromCart,
    totals,
    promo,
    applyPromo,
    removePromo,
  } = useStore();
  const [code, setCode] = useState("");

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-4xl">
                  🛒
                </span>
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add some delicious food to get started.
                </p>
                <Link
                  to="/menu"
                  onClick={() => setCartOpen(false)}
                  className="mt-2 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-5 no-scrollbar">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-3 rounded-2xl border border-border bg-background p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-bold leading-tight">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.restaurantName}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-border p-1">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="grid h-6 w-6 place-items-center rounded-full bg-secondary"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center text-sm font-bold">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="grid h-6 w-6 place-items-center rounded-full bg-gradient-primary text-primary-foreground"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-border p-5">
                  {promo ? (
                    <div className="flex items-center justify-between rounded-xl bg-accent/10 px-4 py-2.5 text-sm">
                      <span className="flex items-center gap-2 font-semibold text-accent">
                        <Tag className="h-4 w-4" /> {promo.code} applied
                      </span>
                      <button
                        onClick={removePromo}
                        className="text-xs font-semibold text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Promo code (try FLASH50)"
                        className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                      <button
                        onClick={() => {
                          applyPromo(code);
                          setCode("");
                        }}
                        className="shrink-0 rounded-full bg-secondary px-4 text-sm font-semibold"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  <div className="space-y-1.5 text-sm">
                    <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
                    {totals.discount > 0 && (
                      <Row
                        label="Discount"
                        value={`- ${formatPrice(totals.discount)}`}
                        accent
                      />
                    )}
                    <Row
                      label="Delivery"
                      value={totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}
                    />
                    <Row label="Tax (5%)" value={formatPrice(totals.tax)} />
                    <div className="my-2 border-t border-dashed border-border" />
                    <div className="flex justify-between text-base font-extrabold">
                      <span>Total</span>
                      <span className="text-gradient">{formatPrice(totals.total)}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                  >
                    Checkout <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "font-semibold text-accent" : "font-semibold"}>{value}</span>
    </div>
  );
}
