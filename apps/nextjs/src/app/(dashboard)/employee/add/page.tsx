"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@emp/ui/button";

import AddEmpForm from "./add-form";

export function ProfileForm() {
  return (
    <div className="container my-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Add Employee</h1>
          <p className="text-sm text-gray-500">
            Add a new employee to the system.
          </p>
        </div>
        <Link href="/employee/list">
          <Button>
            <ChevronLeft className="h-5 w-5" />
            Go Back
          </Button>
        </Link>
      </div>

      <AddEmpForm />
    </div>
  );
}

export default ProfileForm;
