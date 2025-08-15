import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeaveState } from "../types/leaveState";
import { Leave } from "../types/leave";

const initialState: LeaveState = {
  leaves: [],
  loading: false,
  error: null,
  page: 1,
  rowsPerPage: 5,
  totalLeaves: 0,
};

const employeeSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    fetchLeavesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLeavesSuccess: (
      state,
      action: PayloadAction<{ leaves: Leave[]; totalLeaves: number }>
    ) => {
      state.loading = false;
      state.leaves = action.payload.leaves;
      state.totalLeaves = action.payload.totalLeaves;
    },
    fetchLeavesFailure: (state, action: PayloadAction<string>) => {
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
  fetchLeavesStart,
  fetchLeavesSuccess,
  fetchLeavesFailure,
  setPage,
  setRowsPerPage,
} = employeeSlice.actions;

export default employeeSlice.reducer;
