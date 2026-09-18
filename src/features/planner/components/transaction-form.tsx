"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
}

interface Props {
  transactions: Transaction[];
  type: "paycheck" | "expense";
  onChange: (transactions: Transaction[]) => void;
}

export function TransactionForm({ transactions, type, onChange }: Props) {
  const isIncome = type === "paycheck";

  const addTransaction = () => {
    onChange([
      ...transactions,
      {
        id: Date.now().toString(),
        title: isIncome ? "New Paycheck" : "New Expense",
        date: new Date().toISOString().split("T")[0],
        amount: 0,
      },
    ]);
  };

  const removeTransaction = (id: string) => {
    onChange(transactions.filter((t) => t.id !== id));
  };

  const updateTransaction = (
    id: string,
    field: keyof Transaction,
    value: string | number
  ) => {
    onChange(
      transactions.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{isIncome ? "When are you getting paid next?" : "What bills are coming up before then?"}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={addTransaction}
          className="gap-1"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {transactions.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-center gap-2 p-2 rounded border",
              isIncome ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
            )}
          >
            <input
              type="date"
              value={t.date}
              onChange={(e) => updateTransaction(t.id, "date", e.target.value)}
              className="w-28 rounded border p-1 text-sm"
            />
            <input
              type="text"
              value={t.title}
              onChange={(e) => updateTransaction(t.id, "title", e.target.value)}
              className="flex-1 rounded border p-1 text-sm"
              placeholder={isIncome ? "Next paycheck" : "Upcoming bill"}
            />
            <input
              type="number"
              value={t.amount}
              onChange={(e) =>
                updateTransaction(t.id, "amount", Number(e.target.value))
              }
              className="w-24 rounded border p-1 text-sm text-right"
              placeholder="Amount"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTransaction(t.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}