import { ENTITY_COLORS, ENTITY_LABELS } from "@/lib/constants";
import type { EntityType } from "@/types";

interface EntityBadgeProps {
  type: EntityType;
  size?: "sm" | "md";
}

export function EntityBadge({ type, size = "sm" }: EntityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-mono font-bold uppercase tracking-wider text-white ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      }`}
      style={{ backgroundColor: ENTITY_COLORS[type] }}
    >
      {ENTITY_LABELS[type]}
    </span>
  );
}
