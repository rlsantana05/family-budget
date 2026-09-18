"use server";

import { cashFlow } from "@/lib/cashflow";
import { revalidatePath } from "next/cache";
import type { CashFlowInput, CashFlowOutput } from "../types";

export async function recalculateCashFlow(
  data: CashFlowInput
): Promise<CashFlowOutput> {
  const result = cashFlow(data);
  revalidatePath("/planner");
  return result;
}