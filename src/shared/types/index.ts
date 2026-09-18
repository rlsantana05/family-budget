// Shared types for the family budget app
export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  color: string;
  icon: string;
  userId: string;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  currency: Currency;
  description: string;
  date: string; // ISO date string
  type: "INCOME" | "EXPENSE";
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  currency: Currency;
  month: string; // Format: YYYY-MM
  createdAt: string;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  budgetRemaining: number;
  recentTransactions: Transaction[];
}