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
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { validationSchema, validationSchemaRenderValue } from "./config";
import { EditAdminDialogProps } from "./types";

export default function EditAdminDialog({
  open,
  onClose,
  admin,
}: EditAdminDialogProps) {
  const dispatch = useDispatch();

  const { page, rowsPerPage } = useSelector((state: RootState) => state.admins);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      birthDate: admin.birthDate,
      password: "",
      gender: admin.gender,
    },
  });

  const handleSave = async (data: Yup.InferType<typeof validationSchema>) => {
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
        birthDate: admin.birthDate,
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
