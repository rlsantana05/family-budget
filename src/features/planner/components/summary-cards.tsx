import { DollarSign, Triangle, ArrowDown, ArrowUp, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/cashflow";
import type { CalculationSummary } from "@/features/planner";

interface SummaryCardsProps {
  output: CalculationSummary | null;
  formatCurrency: (val: number) => string;
}

export function summaryCards({ output, formatCurrency }: SummaryCardsProps) {
  if (!output) return null;

  const lowestBalanceClass =
    output.lowestBalance < 0 ? "text-red-600" : "text-green-600";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {/* Starting Buffer Card */}
      <div className="rounded-lg border p-6 bg-background/50 dark:bg-zinc-900/50">
        <p className="text-sm text-muted-foreground mb-1">What&apos;s in your bank account today?</p>
        <p className="text-3xl font-bold">{formatCurrency(output.startingBuffer)}</p>
      </div>

      {/* Lowest Predicted Balance Card */}
      <div className="rounded-lg border p-6 bg-background/50 dark:bg-zinc-900/50">
        <p className="text-sm text-muted-foreground mb-1">Your Lowest Balance</p>
        <p className={`text-3xl font-bold ${lowestBalanceClass}`}>
          {formatCurrency(output.lowestBalance)}
        </p>
      </div>

      {/* Net Cash Card */}
      <div className="rounded-lg border p-6 bg-background/50 dark:bg-zinc-900/50">
        <p className="text-sm text-muted-foreground mb-1">What You&apos;ll Have Left</p>
        <p className="text-3xl font-bold">
          {formatCurrency(output.netCash)}
        </p>
      </div>
    </div>
  );
}