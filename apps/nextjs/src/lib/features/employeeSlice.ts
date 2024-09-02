import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Employee } from "@emp/db";

import {
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../queries/employee";

interface EmployeeState {
  employees: Employee[] | [] | undefined;
  emp_tab_active: "list" | "grid";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  emp_tab_active: "list",
  status: "idle",
  error: null,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    setListTabActive: (
      state,
      action: PayloadAction<EmployeeState["emp_tab_active"]>,
    ) => {
      state.emp_tab_active = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchEmployees thunk
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[] | undefined | []>) => {
          state.employees = action.payload;
          state.status = "succeeded";
        },
      )
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Handle deleteEmployee and updateEmployee thunks
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    builder
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setEmployees, setListTabActive } = employeeSlice.actions;

export default employeeSlice.reducer;
