"use client";

import type { RootState } from "@/lib/store";
import type { UnknownAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import Link from "next/link";
import { fetchEmployees } from "@/lib/queries/employee";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@emp/ui/button";
import { Skeleton } from "@emp/ui/skeleton";
import { Tabs, TabsContent, TabsList } from "@emp/ui/tabs";

import EmployeeCard from "./_components/card";
import TabButtons from "./_components/tab";
import { EmpDataTable } from "./_components/table";

function Page() {
  const dispatch = useDispatch();
  const { employees, status, emp_tab_active } = useSelector(
    (state: RootState) => state.employee,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees() as unknown as UnknownAction);
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <div className="container mt-10 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="aspect-square w-[200px]" />
        ))}
      </div>
    );
  }

  if (status === "failed" || !employees?.length) {
    return (
      <div className="flex h-screen items-center justify-center">
        No employees found.
      </div>
    );
  }

  return (
    <Tabs defaultValue={emp_tab_active} className="container">
      <div className="mt-3 flex w-full items-center justify-end gap-2">
        <Link href="/employee/add" passHref>
          <Button className="uppercase">Add Employee</Button>
        </Link>
        <TabsList className="relative bg-transparent">
          <TabButtons />
        </TabsList>
      </div>
      <TabsContent value="list">
        <div className="m-4 flex flex-wrap justify-center gap-2">
          {employees.map((emp) => (
            <EmployeeCard
              key={emp.employeeId}
              id={emp.employeeId}
              first_name={emp.firstName}
              last_name={emp.lastName}
              email={emp.email}
              number={emp.number}
              gender={emp.gender}
              photo={emp.photo}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="grid">
        <div className="m-4 flex flex-wrap justify-center gap-2">
          <EmpDataTable
            data={
              employees.length
                ? employees.map((emp) => ({
                    first_name: emp.firstName,
                    last_name: emp.lastName,
                    ...emp,
                  }))
                : []
            }
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default Page;
