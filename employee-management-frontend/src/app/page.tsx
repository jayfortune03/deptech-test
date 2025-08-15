"use client";

import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react";
import AdminPage from "./components/admin-page";
import EmployeePage from "./components/employee-page";

export default function Home() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        background: "#F2F3F4",
        paddingX: isMobile ? "2rem" : "5rem",
        paddingY: isMobile ? "1.5rem" : "3rem",
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Admins" />
          <Tab label="Employees" />
        </Tabs>
      </Box>

      {value === 0 && <AdminPage />}
      {value === 1 && <EmployeePage />}
    </Box>
  );
}
