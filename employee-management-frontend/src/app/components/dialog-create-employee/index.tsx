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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { validationSchema, validationSchemaRenderValue } from "./config";
import { CreateAdminDialogProps } from "./types";

export default function CreateAdminDialog({
  open,
  onClose,
}: CreateAdminDialogProps) {
  const dispatch = useDispatch();

  const { page, rowsPerPage } = useSelector((state: RootState) => state.admins);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: new Date(),
      password: "",
      gender: "Female",
    },
  });

  const handleSave = async (data: Yup.InferType<typeof validationSchema>) => {
    const userPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: data.birthDate,
      password: data.password,
      gender: data.gender,
    };

    try {
      await axiosInstance.post(`/admins`, userPayload);

      dispatch(fetchAdminsStart());
      const adminsResponse = await axiosInstance.get(`/admins`, {
        params: {
          page,
          rowsPerPage,
        },
      });
      dispatch(fetchAdminsSuccess(adminsResponse.data.data));

      alert(`Success create Admin ${data.firstName} ${data.lastName}`);
    } catch (error) {
      console.error("Error updating admin data", error);
      alert(`Error create Admin ${data.firstName} ${data.lastName}`);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: new Date(),
        password: "",
        gender: "Female",
      });
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#00796b", color: "white" }}>
        Create Admin
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
