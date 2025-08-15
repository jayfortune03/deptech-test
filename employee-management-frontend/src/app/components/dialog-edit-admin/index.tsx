"use client";

import axiosInstance from "@/app/lib/axios";
import { RootState } from "@/app/store";

import { fetchAdminsStart, fetchAdminsSuccess } from "@/app/store/adminSlice";
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
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { validationSchema, validationSchemaRenderValue } from "./config";
import { EditAdminDialogProps } from "./types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Admin } from "@/app/types/admin";
import { useRouter } from "next/navigation";

export default function EditAdminDialog({
  open,
  onClose,
  admin,
}: EditAdminDialogProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [currentSession, setCurrentSession] = useState<Admin | null>(null);

  useEffect(() => {
    async function fetchCurrentSession() {
      const response = await axiosInstance.get(`/auth/currentSession`, {});
      if (response.data.data) {
        setCurrentSession(response.data.data);
      }
    }

    fetchCurrentSession();
  }, []);

  const { page, rowsPerPage } = useSelector((state: RootState) => state.admins);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      birthDate: new Date(admin.birthDate),
      password: "",
      gender: admin.gender,
    },
  });

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

  const handleSave = async (data: Yup.InferType<typeof validationSchema>) => {
    console.log(`🥶🥶🥶🥶 ~ フ ク ロ ウ handleSave ~ フ ク ロ ウ data:`, data);
    const updatedUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: admin.birthDate,
      password: admin.password,
      gender: data.gender,
    };

    try {
      await axiosInstance.put(`/admins/${admin.id}`, updatedUser);

      dispatch(fetchAdminsStart());
      const adminsResponse = await axiosInstance.get(`/admins`, {
        params: {
          page,
          rowsPerPage,
        },
      });
      dispatch(fetchAdminsSuccess(adminsResponse.data.data));

      alert(`Success Edit Admin ${data.firstName} ${data.lastName}`);

      if (currentSession?.id === admin.id) {
        alert(`You need to logout after changing password!`);
        await handleLogout();
      }
    } catch (error) {
      console.error("Error updating admin data", error);
      alert(`Error Edit Admin ${data.firstName} ${data.lastName}`);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        birthDate: new Date(admin.birthDate),
        password: "",
        gender: admin.gender,
      });
    }
  }, [open, admin, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#00796b", color: "white" }}>
        Edit Admin
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fafafa",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit(handleSave)}>
          {validationSchemaRenderValue.map((el) => {
            if (el.value === "gender") {
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
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors[el.value]?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              );
            }

            if (el.value === "password") {
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
                      type="password"
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
            }

            if (el.value === "birthDate") {
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
                              placeholder: "Pilih tanggal",
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
          disabled={!isValid || !isDirty}
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
