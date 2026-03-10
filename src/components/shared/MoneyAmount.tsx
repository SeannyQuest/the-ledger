import { cn } from "@/lib/utils";
import { formatMoney, formatCompactMoney } from "@/lib/utils";

interface MoneyAmountProps {
  amount: number;
  compact?: boolean;
  showSign?: boolean;
  className?: string;
}

export function MoneyAmount({ amount, compact = false, showSign = false, className }: MoneyAmountProps) {
  const formatted = compact ? formatCompactMoney(amount) : formatMoney(amount);
  const display = showSign && amount > 0 ? `+${formatted}` : formatted;

  return (
    <span
      className={cn(
        "font-mono tabular-nums",
        amount > 0 && showSign && "text-money-in",
        amount < 0 && "text-money-out",
        className
      )}
    >
      {display}
    </span>
  );
}
