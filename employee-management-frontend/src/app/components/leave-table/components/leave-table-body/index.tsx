import EditLeaveDialog from "@/app/components/dialog-edit-leave";
import {
  Button,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LeaveTableBodyProps } from "./types";
import DialogDeleteLeave from "@/app/components/dialog-delete-leave";
import { Leave } from "@/app/types/leave";
import dayjs from "dayjs";

export default function LeaveTableBody({
  leaves,
  page,
  rowsPerPage,
}: LeaveTableBodyProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);

  const handleOpenEditDialog = (leave: Leave) => {
    setSelectedLeave(leave);
    setOpenEditDialog(true);
    setOpenDeleteDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedLeave(null);
  };

  const handleOpenDeleteDialog = (leave: Leave) => {
    setSelectedLeave(leave);
    setOpenDeleteDialog(true);
    setOpenEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenEditDialog(false);
    setSelectedLeave(null);
  };

  return (
    <>
      <TableBody>
        {leaves.map((leave, index) => (
          <TableRow
            key={leave.id}
            sx={{
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
              backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
            }}
          >
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              {(page - 1) * rowsPerPage + index + 1}
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#333" }}>
                {leave.employee.firstName} {leave.employee.lastName}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#333" }}>
                {leave.reason}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#333" }}>
                {dayjs(leave.startDate).format("DD-MM-YYYY")}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#777" }}>
                {dayjs(leave.endDate).format("DD-MM-YYYY")}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="body1" sx={{ color: "#777" }}>
                {leave.remainingLeave}
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Stack direction="row" justifyContent={"center"} gap={2}>
                <Button
                  onClick={() => handleOpenEditDialog(leave)}
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
                  onClick={() => handleOpenDeleteDialog(leave)}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#e60f0fff",
                    color: "white",
                    padding: "6px 16px",
                    borderRadius: "4px",
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {selectedLeave && (
        <EditLeaveDialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          leave={selectedLeave}
        />
      )}

      {selectedLeave && (
        <DialogDeleteLeave
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          leave={selectedLeave}
        />
      )}
    </>
  );
}
