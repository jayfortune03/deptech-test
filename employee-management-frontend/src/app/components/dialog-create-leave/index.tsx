"use client";

import axiosInstance from "@/app/lib/axios";
import { RootState } from "@/app/store";

import { fetchLeavesStart, fetchLeavesSuccess } from "@/app/store/leaveSlice";
import { Employee } from "@/app/types/employee";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { validationSchema, validationSchemaRenderValue } from "./config";
import { CreateLeaveProps } from "./types";

export default function CreateLeaveDialog({ open, onClose }: CreateLeaveProps) {
  const dispatch = useDispatch();

  const [employees, setEmployees] = useState<Employee[]>();

  const { page, rowsPerPage, leaves } = useSelector(
    (state: RootState) => state.leaves
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      employee: "",
      endDate: new Date(),
      reason: "",
      startDate: new Date(),
    },
  });

  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");
  const watchEmployee = watch("employee");

  const calculateDaysBetween = (startDate: Date, endDate: Date) => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  };

  const handleSave = async (data: Yup.InferType<typeof validationSchema>) => {
    const updatedUser = {
      employeeId: Number(data.employee),
      endDate: data.endDate,
      reason: data.reason,
      startDate: data.startDate,
    };

    try {
      await axiosInstance.post(`/leaves`, updatedUser);

      dispatch(fetchLeavesStart());
      const leavesResponse = await axiosInstance.get(`/leaves`, {
        params: {
          page,
          rowsPerPage,
        },
      });
      dispatch(fetchLeavesSuccess(leavesResponse.data.data));

      onClose();
    } catch (error) {
      console.error("Error creating leave data", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (open) {
      reset();

      const fetchEmployee = async () => {
        const response = await axiosInstance.get(`/employees`, {
          params: {
            page: 1,
            rowsPerPage: 50000,
          },
        });

        setEmployees(response.data.data.employees);
      };

      fetchEmployee();
    }
  }, [open, reset]);

  useEffect(() => {
    const validateRemainingLeave = async () => {
      if (watchStartDate && watchEndDate && watchEmployee) {
        const startDate = new Date(watchStartDate);
        const endDate = new Date(watchEndDate);

        const totalDaysRequested = calculateDaysBetween(startDate, endDate);
        const remainingLeaveData = leaves.find(
          (el) => el.employeeId == Number(watchEmployee)
        )?.remainingLeave;
        if (remainingLeaveData && remainingLeaveData < totalDaysRequested) {
          alert("You don't have enough remaining leave for this period.");
        }
      }
    };

    validateRemainingLeave();
  }, [watchStartDate, watchEndDate, watchEmployee, leaves]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#00796b", color: "white" }}>
        Create Leave
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fafafa",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit(handleSave)}>
          {validationSchemaRenderValue.map((el) => {
            if (el.value === "startDate") {
              return (
                <Controller
                  key={el.value}
                  name={el.value}
                  control={control}
                  render={({ field }) => (
                    <Stack my={0.5}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          {...field}
                          label={el.label}
                          slotProps={{
                            textField: {
                              placeholder: "Pick Date",
                              fullWidth: true,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>
                  )}
                />
              );
            }

            if (el.value === "endDate") {
              return (
                <Controller
                  key={el.value}
                  name={el.value}
                  control={control}
                  render={({ field }) => (
                    <Stack my={0.5}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          {...field}
                          label={el.label}
                          slotProps={{
                            textField: {
                              placeholder: "Pick Date",
                              fullWidth: true,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>
                  )}
                />
              );
            }

            if (el.value === "employee") {
              return (
                <Controller
                  key={el.value}
                  name={el.value}
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors[el.value]}
                    >
                      <InputLabel>{el.label}</InputLabel>
                      <Select {...field} label={el.label}>
                        {employees?.map((el) => {
                          return (
                            <MenuItem value={el.id} key={el.id}>
                              {el.firstName} {el.lastName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>
                        {errors[el.value]?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              );
            }

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
