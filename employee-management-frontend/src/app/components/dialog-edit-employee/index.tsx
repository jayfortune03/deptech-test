"use client";

import axiosInstance from "@/app/lib/axios";
import { RootState } from "@/app/store";
import {
  fetchEmployeesFailure,
  fetchEmployeesStart,
  fetchEmployeesSuccess,
} from "@/app/store/employeeSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { validationSchema, validationSchemaRenderValue } from "./config";
import { EditEmployeeDialogProps } from "./types";
import { useEffect } from "react";

export default function EditUserDialog({
  open,
  onClose,
  employee,
}: EditEmployeeDialogProps) {
  const dispatch = useDispatch();

  const { page, rowsPerPage } = useSelector(
    (state: RootState) => state.employees
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      address: employee.address,
      gender: employee.gender,
    },
  });

  const handleSave = async (data: Yup.InferType<typeof validationSchema>) => {
    const updatedUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      gender: data.gender,
    };

    try {
      await axiosInstance.put(
        `/auth/update-employee-data/${employee.id}`,
        updatedUser
      );

      dispatch(fetchEmployeesStart());
      const employeesResponse = await axiosInstance.get(
        `/auth/fetch-employee-data`,
        {
          params: {
            page,
            rowsPerPage,
          },
        }
      );
      dispatch(fetchEmployeesSuccess(employeesResponse.data.data));

      onClose();
    } catch (error) {
      console.error("Error updating employee data", error);
      dispatch(fetchEmployeesFailure("Failed to update employee"));
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        address: employee.address,
        gender: employee.gender,
      });
    }
  }, [open, employee, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#00796b", color: "white" }}>
        Edit User
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fafafa",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit(handleSave)}>
          {validationSchemaRenderValue.map((el) => {
            return (
              <Controller
                key={el.value}
                name={el.value}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={el.label}
                    fullWidth
                    margin="normal"
                    error={!!errors[el.value]}
                    helperText={errors[el.value]?.message}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                    }}
                  />
                )}
              />
            );
          })}
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#e0f2f1",
        }}
      >
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            backgroundColor: "#d32f2f",
            color: "white",
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          onClick={handleSubmit(handleSave)}
          sx={{
            backgroundColor: "#00796b",
            color: "white",
            "&:hover": {
              backgroundColor: "#004d40",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
