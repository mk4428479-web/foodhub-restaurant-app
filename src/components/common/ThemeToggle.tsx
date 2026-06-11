import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "../../store/StoreProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useStore();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="grid place-items-center"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-gold" />
        ) : (
          <Moon className="h-5 w-5 text-primary" />
        )}
      </motion.span>
    </button>
  );
}
