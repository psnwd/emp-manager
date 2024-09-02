import Link from "next/link";
import { env } from "@/env";
import { ChevronLeft } from "lucide-react";

import type { Employee } from "@emp/db";
import { Button } from "@emp/ui/button";

import EmpEditForm from "./edit-form";

export async function ProfileForm({ params }: { params: { id: string } }) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_API_URL}/employee/search?empId=${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3,
      },
    },
  );

  if (!res.ok) {
    return <div>No employees found.</div>;
  }

  const employees: Employee = (await res.json().catch(() => {
    throw new Error("Invalid JSON response");
  })) as Employee;

  return (
    <div className="container my-4">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Update Employee</h1>
          <p className="text-sm text-gray-500">Update employee details here.</p>
        </div>
        <Link href="/employee/list">
          <Button>
            <ChevronLeft className="h-5 w-5" />
            Go Back
          </Button>
        </Link>
      </div>
      <EmpEditForm
        id={employees.employeeId}
        first_name={employees.firstName}
        last_name={employees.lastName}
        email={employees.email}
        number={employees.number}
        gender={employees.gender}
        photo={employees.photo}
      />
    </div>
  );
}

export default ProfileForm;
