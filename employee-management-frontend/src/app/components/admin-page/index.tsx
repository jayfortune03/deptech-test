"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import axiosInstance from "@/app/lib/axios";
import MenuButton from "../reload-button";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import AdminTable from "../admin-table";
import {
  fetchAdminsFailure,
  fetchAdminsStart,
  fetchAdminsSuccess,
} from "@/app/store/adminSlice";
import { setPage, setRowsPerPage } from "@/app/store/employeeSlice";
import CreateAdminDialog from "../dialog-create-admin";

export default function AdminPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { page, rowsPerPage, admins, totalAdmins, loading, error } =
    useSelector((state: RootState) => state.admins);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleLogout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
      router.replace("/auth/login");
    } catch (err) {
      console.log(
        "🥶🥶🥶🥶 ~ フ ク ロ ウ handleLogout ~ フ ク ロ ウ err:",
        err
      );
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchAdminsStart());

      try {
        const response = await axiosInstance.get(`/admins`, {
          params: {
            page,
            rowsPerPage,
          },
        });

        dispatch(fetchAdminsSuccess(response.data.data));
      } catch (err) {
        console.error("Error fetching data", err);
        dispatch(fetchAdminsFailure("Failed to fetch employees"));
        alert("Session has expired. Please relog.");
        await handleLogout();
      }
    };

    fetchData();
  }, [dispatch, handleLogout, page, rowsPerPage]);

  const handleReload = () => {
    dispatch(setPage(1));
    dispatch(fetchAdminsStart());
    axiosInstance
      .get("/admins", {
        params: {
          page: 1,
          rowsPerPage,
        },
      })
      .then((response) => {
        dispatch(fetchAdminsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchAdminsFailure("Failed to reload employees"));
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
      <CreateAdminDialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
      />

      <Stack
        display={"flex"}
        direction={"row"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Admins List</Typography>

        <MenuButton
          handleLogout={handleLogout}
          handleReload={handleReload}
          handleCreate={handleOpenCreateDialog}
        />
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : admins?.length > 0 ? (
        <>
          <AdminTable
            admins={admins}
            error={error || ""}
            totalAdmins={totalAdmins}
            loading={loading}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography>No admins found</Typography>
      )}
    </>
  );
}
