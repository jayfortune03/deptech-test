import DialogDeleteAdmin from "@/app/components/dialog-delete-admin";
import EditAdminDialog from "@/app/components/dialog-edit-admin";
import { Admin } from "@/app/types/admin";
import {
  Button,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AdminTableBodyProps } from "./types";
import axiosInstance from "@/app/lib/axios";

dayjs.locale("id");

export default function AdminTableBody({
  admins,
  page,
  rowsPerPage,
}: AdminTableBodyProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

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

  const handleOpenEditDialog = (admin: Admin) => {
    setSelectedAdmin(admin);
    setOpenEditDialog(true);
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = (admin: Admin) => {
    setSelectedAdmin(admin);
    setOpenDeleteDialog(true);
    setOpenEditDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedAdmin(null);
  };

  const handleCloseDeleteDialog = () => {
    setOpenEditDialog(false);
    setSelectedAdmin(null);
  };

  return (
    <>
      <TableBody>
        {admins.map((admin, index) => (
          <TableRow
            key={admin.id}
            sx={{
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
              backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
            }}
          >
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              {(page - 1) * rowsPerPage + index + 1}{" "}
              {currentSession?.id === admin.id ? "(YOU)" : ""}
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#333" }}>
                {admin.firstName}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#333" }}>
                {admin.lastName}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#777" }}>
                {dayjs(admin.birthDate).format("DD-MM-YYYY")}
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#777" }}>
                {admin.gender}
              </Typography>
            </TableCell>
            <TableCell>
              <Stack direction="row" justifyContent={"center"} gap={2}>
                <Button
                  onClick={() => handleOpenEditDialog(admin)}
                  color="primary"
                  sx={{
                    backgroundColor: "#00796b",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#004d40",
                    },
                    padding: "6px 16px",
                    borderRadius: "4px",
                  }}
                >
                  Edit
                </Button>

                <Button
                  onClick={() => handleOpenDeleteDialog(admin)}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#e60f0fff",
                    color: "white",
                    padding: "6px 16px",
                    borderRadius: "4px",
                  }}
                  disabled={currentSession?.id === admin.id}
                >
                  Delete
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {selectedAdmin && (
        <EditAdminDialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          admin={selectedAdmin}
        />
      )}

      {selectedAdmin && (
        <DialogDeleteAdmin
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          admin={selectedAdmin}
        />
      )}
    </>
  );
}
