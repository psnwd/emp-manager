import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

import { Button } from "@emp/ui/button";

export default function HomePage() {
  return (
    <main className="container py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="select-none text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-primary">Employee</span> Management System
        </h1>
        <div className="mt-10">
          <Link href="/employee/list">
            <Button className="flex select-none gap-2">
              Employee Dashboard <SquareArrowOutUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
