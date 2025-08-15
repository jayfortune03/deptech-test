"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";

import axiosInstance from "@/app/lib/axios";
import { RootState } from "@/app/store";

import {
  fetchLeavesFailure,
  fetchLeavesStart,
  fetchLeavesSuccess,
  setPage,
  setRowsPerPage,
} from "@/app/store/leaveSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateLeaveDialog from "../dialog-create-leave";
import LeaveTable from "../leave-table";
import MenuButton from "../reload-button";

export default function LeavePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { page, rowsPerPage, leaves, totalLeaves, loading, error } =
    useSelector((state: RootState) => state.leaves);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchLeavesStart());

      try {
        const response = await axiosInstance.get(`/leaves`, {
          params: {
            page,
            rowsPerPage,
          },
        });

        dispatch(fetchLeavesSuccess(response.data.data));
      } catch (err) {
        console.error("Error fetching data", err);
        dispatch(fetchLeavesFailure("Failed to fetch leaves"));
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
    dispatch(setPage(1));
    dispatch(fetchLeavesStart());
    axiosInstance
      .get("/leaves", {
        params: {
          page: 1,
          rowsPerPage,
        },
      })
      .then((response) => {
        dispatch(fetchLeavesSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchLeavesFailure("Failed to reload employees"));
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
    dispatch(setPage(1));
  };

  return (
    <>
      <CreateLeaveDialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
      />

      <Stack
        display={"flex"}
        direction={"row"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Leave List</Typography>

        <MenuButton
          handleLogout={handleLogout}
          handleCreate={handleOpenCreateDialog}
          handleReload={handleReload}
        />
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : leaves?.length > 0 ? (
        <>
          <LeaveTable
            leaves={leaves}
            loading={loading}
            error={error || ""}
            totalLeaves={totalLeaves}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography>No leaves found</Typography>
      )}
    </>
  );
}
