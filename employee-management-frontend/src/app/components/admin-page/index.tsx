"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchEmployeesFailure,
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  setPage,
  setRowsPerPage,
} from "@/app/store/employeeSlice";
import axiosInstance from "@/app/lib/axios";
import MenuButton from "../reload-button";
import EmployeeTable from "../employee-table";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { page, rowsPerPage, employees, totalEmployees, loading, error } =
    useSelector((state: RootState) => state.employees);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchEmployeesStart());

      try {
        const response = await axiosInstance.get(`/employees`, {
          params: {
            page,
            rowsPerPage,
          },
        });

        dispatch(fetchEmployeesSuccess(response.data.data));
      } catch (err) {
        console.error("Error fetching data", err);
        dispatch(fetchEmployeesFailure("Failed to fetch employees"));
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
    dispatch(fetchEmployeesStart());
    axiosInstance
      .get("/employees", {
        params: {
          page: 1,
          rowsPerPage,
        },
      })
      .then((response) => {
        dispatch(fetchEmployeesSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(fetchEmployeesFailure("Failed to reload employees"));
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
      <Stack
        display={"flex"}
        direction={"row"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Admins List</Typography>

        <MenuButton handleLogout={handleLogout} handleReload={handleReload} />
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : employees?.length > 0 ? (
        <>
          <EmployeeTable
            employees={employees}
            loading={loading}
            error={error || ""}
            totalEmployees={totalEmployees}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography>No employees found</Typography>
      )}
    </>
  );
}
