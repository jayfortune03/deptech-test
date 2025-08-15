import EditEmployeeDialog from "@/app/components/dialog-edit-employee";
import { Employee } from "@/app/types/employee";
import {
  Button,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { EmployeeTableBodyProps } from "./types";
import DialogDeleteEmployee from "@/app/components/dialog-delete-employee";

export default function EmployeeTableBody({
  employees,
  page,
  rowsPerPage,
}: EmployeeTableBodyProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleOpenEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenEditDialog(true);
    setOpenDeleteDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedEmployee(null);
  };

  const handleOpenDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteDialog(true);
    setOpenEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenEditDialog(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <TableBody>
        {employees.map((employee, index) => (
          <TableRow
            key={employee.id}
            sx={{
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
              backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
            }}
          >
            <TableCell sx={{ fontWeight: "bold" }}>
              {(page - 1) * rowsPerPage + index + 1}
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {employee.firstName}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {employee.lastName}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {employee.email}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {employee.phoneNumber}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {employee.address}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {employee.gender}
              </Typography>
            </TableCell>

            <TableCell>
              <Stack direction="row" justifyContent={"center"} gap={2}>
                <Button
                  onClick={() => handleOpenEditDialog(employee)}
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
                  onClick={() => handleOpenDeleteDialog(employee)}
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

      {selectedEmployee && (
        <EditEmployeeDialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          employee={selectedEmployee}
        />
      )}

      {selectedEmployee && (
        <DialogDeleteEmployee
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          employee={selectedEmployee}
        />
      )}
    </>
  );
}
