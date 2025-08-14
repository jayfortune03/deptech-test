"use client";

import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "./components/reload-button";
import UserTable from "./components/user-table";
import axiosInstance from "./lib/axios";
import { RootState } from "./store";
import {
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  setPage,
  setRowsPerPage,
} from "./store/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");

  const { users, page, rowsPerPage, totalUsers, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUsersStart());

      try {
        const response = await axiosInstance.get(`/user/fetch-user-data`, {
          params: {
            page,
            rowsPerPage,
          },
        });

        dispatch(fetchUsersSuccess(response.data.data));
      } catch (err) {
        console.error("Error fetching data", err);
        dispatch(fetchUsersFailure("Failed to fetch users"));
      }
    };

    fetchData();
  }, [dispatch, page, rowsPerPage]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      router.replace("/auth/login");
    } catch (err) {
      console.log(
        "🥶🥶🥶🥶 ~ フ ク ロ ウ handleLogout ~ フ ク ロ ウ err:",
        err
      );
    }
  };

  const handleReload = () => {
    dispatch(setPage(0));
    dispatch(fetchUsersStart());
    axiosInstance
      .get("/fetch-user-data", {
        params: {
          page: 0,
          rowsPerPage,
        },
      })
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure("Failed to reload users"));
        console.error("Error reloading data", error);
      });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setRowsPerPage(Number(event.target.value)));
    dispatch(setPage(0));
  };

  return (
    <Box
      sx={{
        background: "#F2F3F4",
        paddingX: isMobile ? "2rem" : "5rem",
        paddingY: isMobile ? "1.5rem" : "3rem",
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <Stack
        display={"flex"}
        direction={"row"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Users List</Typography>

        <MenuButton handleLogout={handleLogout} handleReload={handleReload} />
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : users.length > 0 ? (
        <>
          <UserTable
            users={users}
            loading={loading}
            error={error || ""}
            totalUsers={totalUsers}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography>No users found</Typography>
      )}
    </Box>
  );
}
