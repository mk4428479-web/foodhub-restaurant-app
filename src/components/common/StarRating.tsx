import { Star } from "lucide-react";
import { cn } from "../../lib/format";

export function StarRating({
  rating,
  size = "sm",
  showValue = true,
}: {
  rating: number;
  size?: "sm" | "md";
  showValue?: boolean;
}) {
  const px = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <span className="inline-flex items-center gap-1">
      <Star className={cn(px, "fill-gold text-gold")} />
      {showValue && (
        <span className={cn("font-semibold", size === "sm" ? "text-xs" : "text-sm")}>
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
