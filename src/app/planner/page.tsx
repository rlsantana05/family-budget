"use client";

import { useState } from "react";
import { CashFlowInput, CashFlowOutput } from "@/features/planner";
import {
  TransactionForm,
  LedgerTable,
  recalculateCashFlow,
} from "@/features/planner";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { formatCurrency } from "@/lib/cashflow";

export default function PlannerPage() {
  const [startingBuffer, setStartingBuffer] = useState(0);
  const [paychecks, setPaychecks] = useState<
    Array<{ id: string; title: string; date: string; amount: number }>
  >([]);
  const [expenses, setExpenses] = useState<
    Array<{ id: string; title: string; date: string; amount: number }>
  >([]);
  const [output, setOutput] = useState<CashFlowOutput | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleRecalculate = async () => {
    setIsCalculating(true);
    try {
      const data: CashFlowInput = {
        startingBuffer,
        paychecks,
        expenses,
      };
      const result = await recalculateCashFlow(data);
      setOutput(result);
    } catch (error) {
      console.error("Recalculation failed:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Let's map out your cash flow</h1>

      {/* Zone A: Inputs */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">What's in your bank account today?</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="number"
              value={startingBuffer}
              onChange={(e) => setStartingBuffer(Number(e.target.value))}
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Current balance"
            />
          </CardContent>
        </Card>

        <TransactionForm
          transactions={paychecks}
          type="paycheck"
          onChange={setPaychecks}
        />

        <TransactionForm
          transactions={expenses}
          type="expense"
          onChange={setExpenses}
        />
      </div>

      {/* Calculate */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleRecalculate}
        disabled={isCalculating}
      >
        {isCalculating ? "Working on it..." : "Show My Timeline"}
      </Button>

      {/* Zone B: Outputs (only show after calculation) */}
      {output && (
        <>
          {/* Primary Takeaway Banner */}
          <div
            className={
              `rounded-lg p-4 text-sm ${output.hasDeficit
                ? "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"}`
            }
            role="status"
          >
            {output.hasDeficit ? (
              <>
                <strong>Heads up:</strong> You might run low around {output.lowestBalanceDate}. You'll be short by {formatCurrency(Math.abs(output.lowestBalance))} until your next check.
              </>
            ) : (
              <>
                <strong>You're in the clear!</strong> Your balance stays above $0 all month.
              </>
            )}
          </div>

          {/* Summary Metrics Row */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Your Lowest Balance</p>
                  <p className={`text-2xl font-bold ${output.lowestBalance < 0 ? "text-red-600" : "text-green-600"}`}>
                    {formatCurrency(output.lowestBalance)}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">When Will It Happen?</p>
                  <p className="text-lg font-medium">{output.lowestBalanceDate || "N/A"}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">What You'll Have Left</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(output.netCash)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Timeline Ledger Table */}
            <LedgerTable timeline={output.timeline} />
          </div>
        </>
      )}
    </div>
  );
}
