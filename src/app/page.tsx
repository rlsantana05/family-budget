import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Family Budget
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Plan your paychecks, track expenses, and keep your family finances on track.
        </p>
        <Link href="/planner">
          <Button variant="primary" size="lg">
            Open Planner
          </Button>
        </Link>
      </div>
    </main>
  );
}