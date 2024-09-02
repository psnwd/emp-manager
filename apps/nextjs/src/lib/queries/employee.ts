import { env } from "@/env";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { Employee } from "@emp/db";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BASE_API_URL}/employee`);
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = (await response.json()) as Employee[];
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Async thunk to delete an employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId: number, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BASE_API_URL}/employee/${employeeId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      // Re-fetch the employee list after deletion
      await dispatch(fetchEmployees());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

// Async thunk to update an employee
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (updatedEmployee: Employee, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BASE_API_URL}/employee/${updatedEmployee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmployee),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      await dispatch(fetchEmployees());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
