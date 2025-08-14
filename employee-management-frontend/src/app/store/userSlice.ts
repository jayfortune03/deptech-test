import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { UserState } from "../types/userState";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  page: 0,
  rowsPerPage: 5,
  totalUsers: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (
      state,
      action: PayloadAction<{ users: User[]; totalUsers: number }>
    ) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
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
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  setPage,
  setRowsPerPage,
} = userSlice.actions;

export default userSlice.reducer;
