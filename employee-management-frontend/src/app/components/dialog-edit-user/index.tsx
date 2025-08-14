"use client";

import axiosInstance from "@/app/lib/axios";
import { RootState } from "@/app/store";
import {
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
} from "@/app/store/userSlice";
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
import { validationSchema } from "./config";
import { EditUserDialogProps } from "./types";
import { useEffect } from "react";

export default function EditUserDialog({
  open,
  onClose,
  user,
}: EditUserDialogProps) {
  const dispatch = useDispatch();

  const { page, rowsPerPage } = useSelector((state: RootState) => state.users);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: user.name,
      totalAverageWeightRatings: user.totalAverageWeightRatings,
      numberOfRents: user.numberOfRents,
      recentlyActive: user.recentlyActive,
    },
  });

  const handleSave = async (data: Yup.InferType<typeof validationSchema>) => {
    const updatedUser = {
      name: data.name,
      totalAverageWeightRatings: data.totalAverageWeightRatings,
      numberOfRents: data.numberOfRents,
      recentlyActive: data.recentlyActive,
    };

    try {
      await axiosInstance.put(`/auth/update-user-data/${user.id}`, updatedUser);

      dispatch(fetchUsersStart());
      const usersResponse = await axiosInstance.get(`/auth/fetch-user-data`, {
        params: {
          page,
          rowsPerPage,
        },
      });
      dispatch(fetchUsersSuccess(usersResponse.data.data));

      onClose();
    } catch (error) {
      console.error("Error updating user data", error);
      dispatch(fetchUsersFailure("Failed to update user"));
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        name: user.name,
        totalAverageWeightRatings: user.totalAverageWeightRatings,
        numberOfRents: user.numberOfRents,
        recentlyActive: user.recentlyActive,
      });
    }
  }, [open, user, reset]);

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
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
            )}
          />
          <Controller
            name="totalAverageWeightRatings"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Total Average Weight Ratings"
                fullWidth
                type="number"
                margin="normal"
                error={!!errors.totalAverageWeightRatings}
                helperText={errors.totalAverageWeightRatings?.message}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
            )}
          />
          <Controller
            name="numberOfRents"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Number of Rents"
                fullWidth
                type="number"
                margin="normal"
                error={!!errors.numberOfRents}
                helperText={errors.numberOfRents?.message}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
            )}
          />
          <Controller
            name="recentlyActive"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Recently Active"
                fullWidth
                type="number"
                margin="normal"
                error={!!errors.recentlyActive}
                helperText={errors.recentlyActive?.message}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
            )}
          />
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
