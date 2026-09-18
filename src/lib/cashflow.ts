import { CashFlowInput, CashFlowOutput } from "@/features/planner/types";

/** Format a number as currency, handling negative sign placement. */
export const formatCurrency = (val: number) => {
  const formatted = Math.abs(val).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return val < 0 ? `-${formatted}` : formatted;
};

export function cashFlow(data: CashFlowInput): CashFlowOutput {
  // Combine paychecks and expenses into one timeline, then sort by date
  const allItems = [
    ...data.paychecks.map((p) => ({
      title: p.title,
      amount: p.amount,
      date: p.date,
      type: "INFLOW" as const,
    })),
    ...data.expenses.map((e) => ({
      title: e.title,
      amount: e.amount,
      date: e.date,
      type: "OUTFLOW" as const,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date) || b.amount - a.amount);

  // Group items by date
  const grouped = new Map<string, typeof allItems>();
  for (const item of allItems) {
    const existing = grouped.get(item.date) ?? [];
    existing.push(item);
    grouped.set(item.date, existing);
  }

  // Build timeline with running balance
  const timeline: CashFlowOutput["timeline"] = [];
  let runningBalance = data.startingBuffer;
  let lowestBalance = data.startingBuffer;
  let lowestBalanceDate = "";

  // We also need days with no transactions but between transaction dates
  const sortedDates = Array.from(grouped.keys()).sort();
  for (const date of sortedDates) {
    const items = grouped.get(date)!;
    const inflow = items
      .filter((i) => i.type === "INFLOW")
      .reduce((sum, i) => sum + i.amount, 0);
    const outflow = items
      .filter((i) => i.type === "OUTFLOW")
      .reduce((sum, i) => sum + i.amount, 0);

    const endingBalance = runningBalance + inflow - outflow;

    timeline.push({
      date,
      inflow,
      outflow,
      endingBalance,
      items: items.map((i) => ({
        title: i.title,
        amount: i.amount,
        type: i.type,
      })),
    });

    runningBalance = endingBalance;

    if (runningBalance < lowestBalance) {
      lowestBalance = runningBalance;
      lowestBalanceDate = date;
    }
  }

  return {
    hasDeficit: lowestBalance < 0,
    lowestBalance,
    lowestBalanceDate,
    startingBuffer: data.startingBuffer,
    netCash: runningBalance,
    timeline,
  };
}