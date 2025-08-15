import EditAdminDialog from "@/app/components/dialog-edit-admin";
import { Admin } from "@/app/types/admin";
import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { AdminTableBodyProps } from "./types";

dayjs.locale("id");

export default function AdminTableBody({
  admins,
  page,
  rowsPerPage,
}: AdminTableBodyProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const handleOpenEditDialog = (admin: Admin) => {
    setSelectedAdmin(admin);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
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
            <TableCell sx={{ fontWeight: "bold" }}>
              {page * rowsPerPage + index + 1}
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {admin.firstName} {admin.lastName}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {dayjs(admin.birthDate).format("DD-MM-YYYY")}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {admin.gender}
              </Typography>
            </TableCell>
            <TableCell>
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
    </>
  );
}
