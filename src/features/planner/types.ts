export type CashFlowInput = {
  startingBuffer: number;
  paychecks: Array<{ id: string; title: string; date: string; amount: number }>;
  expenses: Array<{ id: string; title: string; date: string; amount: number }>;
};

/** Summary metrics for metric rendering (PRD Spec) */
export type CalculationSummary = {
  startingBuffer: number;      // Matches user input field
  lowestBalance: number;       // e.g., -800.00
  lowestBalanceDate: string;   // e.g., "2026-09-23"
  netCash: number;             // e.g., 1200.00
};

export type CashFlowOutput = {
  hasDeficit: boolean;
  lowestBalance: number;
  lowestBalanceDate: string;
  netCash: number;
  startingBuffer: number;
  timeline: Array<{
    date: string;
    inflow: number;
    outflow: number;
    endingBalance: number;
    items: Array<{ title: string; amount: number; type: "INFLOW" | "OUTFLOW" }>;
  }>;
};