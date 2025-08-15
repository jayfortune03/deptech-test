import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeeState } from "../types/employeeState";
import { Employee } from "../types/employee";

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  page: 1,
  rowsPerPage: 5,
  totalEmployees: 0,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    fetchEmployeesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess: (
      state,
      action: PayloadAction<{ employees: Employee[]; totalEmployees: number }>
    ) => {
      state.loading = false;
      state.employees = action.payload.employees;
      state.totalEmployees = action.payload.totalEmployees;
    },
    fetchEmployeesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  setPage,
  setRowsPerPage,
} = employeeSlice.actions;

export default employeeSlice.reducer;
