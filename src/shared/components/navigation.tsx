"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";

export function Navigation() {
  const router = useRouter();

  return (
    <nav className="border-b bg-white/50 dark:bg-zinc-900 sticky top-0 z-20 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            href="/planner"
            className="font-semibold text-lg hover:underline"
            style={{ color: "inherit" }}
          >
            <span className="text-2xl">💰</span>
            Family Budget
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/planner"
            className="text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors"
          >
            Planner
          </Link>
          <Link
            href="/"
            className="text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            <span className="text-sm">Reset</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}