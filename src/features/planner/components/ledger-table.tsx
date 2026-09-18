"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatCurrency } from "@/lib/cashflow";
import type { CashFlowOutput } from "@/features/planner";

interface LedgerItem {
  title: string;
  amount: number;
  type: "INFLOW" | "OUTFLOW";
}

interface LedgerTableProps {
  timeline: CashFlowOutput["timeline"];
}

export function LedgerTable({ timeline }: LedgerTableProps) {
  if (timeline.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No transactions yet</p>
        <p className="text-sm">Add some paychecks and bills to see your timeline.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white dark:bg-zinc-900">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-zinc-50 dark:bg-zinc-800">
            <th className="p-3 text-left font-medium">When</th>
            <th className="p-3 text-left font-medium">What&apos;s Happening</th>
            <th className="p-3 text-right font-medium">Money In</th>
            <th className="p-3 text-right font-medium">Money Out</th>
            <th className="p-3 text-right font-medium">What&apos;s Left</th>
          </tr>
        </thead>
        <tbody>
          {timeline.map((day, idx) => (
            <motion.tr
              key={day.date}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <td className="p-3 font-medium">{day.date}</td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {day.items.map((item) => (
                    <span
                      key={item.title}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                        item.type === "INFLOW"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      )}
                    >
                      {item.type === "INFLOW" ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      {item.title}: {formatCurrency(item.amount)}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-3 text-right text-green-600 font-medium">
                {formatCurrency(day.inflow)}
              </td>
              <td className="p-3 text-right text-red-600 font-medium">
                {formatCurrency(day.outflow)}
              </td>
              <td
                className={cn(
                  "p-3 text-right font-bold",
                  day.endingBalance < 0 ? "text-red-600" : "text-green-600"
                )}
              >
                {formatCurrency(day.endingBalance)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}