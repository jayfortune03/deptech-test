"use client";

import ReplayIcon from "@mui/icons-material/Replay";
import LogoutIcon from "@mui/icons-material/Logout";

import { IconButton, Stack } from "@mui/material";
import { MenuButtonProps } from "./types";

export default function MenuButton({
  handleReload,
  handleLogout,
}: MenuButtonProps) {
  return (
    <Stack direction="row" alignItems={"center"} gap={1}>
      <IconButton
        size="small"
        onClick={handleReload}
        sx={{ backgroundColor: "#00796b", color: "white" }}
      >
        <ReplayIcon />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => handleLogout()}
        sx={{ backgroundColor: "#d32f2f", color: "white" }}
      >
        <LogoutIcon />
      </IconButton>
    </Stack>
  );
}
