"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "../../lib/axios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { validationSchema } from "./config";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleLogin = async (data: { username: string; password: string }) => {
    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/login", {
        userName: data.username,
        password: data.password,
      });

      router.replace("/");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        background: "#e8f5e9", // Soft green background
      }}
    >
      <Box
        sx={{
          flex: isMobile ? 0 : 1,
          background: `url('/images/login-ilustration.png') no-repeat center center`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      ></Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "1rem" : "2rem",
          backgroundColor: "#ffffff",
          boxShadow: 3,
          borderRadius: 2,
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: isMobile ? "100%" : "400px",
            padding: "2rem",
            background: "#F3F4F5",
            boxShadow: 3,
            borderRadius: "0.25rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Login
          </Typography>

          <Typography
            variant="h6"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Welcome! Please log in to Access
          </Typography>

          <form onSubmit={handleSubmit(handleLogin)} style={{ width: "100%" }}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  required
                  sx={{
                    marginBottom: 2,
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                  sx={{
                    marginBottom: 2,
                  }}
                />
              )}
            />

            {error && (
              <Typography
                color="error"
                sx={{ textAlign: "center", marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: "20px",
                padding: "12px",
                fontSize: "16px",
                borderRadius: 2,
                backgroundColor: "#388e3c",
                "&:hover": {
                  backgroundColor: "#2c6e2f",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
