import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminsState } from "../types/adminState";
import { Admin } from "../types/admin";

const initialState: AdminsState = {
  admins: [],
  loading: false,
  error: null,
  page: 1,
  rowsPerPage: 5,
  totalAdmins: 0,
};

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    fetchAdminsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAdminsSuccess: (
      state,
      action: PayloadAction<{ admins: Admin[]; totalAdmins: number }>
    ) => {
      state.loading = false;
      state.admins = action.payload.admins;
      state.totalAdmins = action.payload.totalAdmins;
    },
    fetchAdminsFailure: (state, action: PayloadAction<string>) => {
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
  fetchAdminsStart,
  fetchAdminsSuccess,
  fetchAdminsFailure,
  setPage,
  setRowsPerPage,
} = adminSlice.actions;

export default adminSlice.reducer;
