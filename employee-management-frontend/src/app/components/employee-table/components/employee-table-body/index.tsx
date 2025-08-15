import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EditEmployeeDialog from "@/app/components/dialog-edit-employee";
import { EmployeeTableBodyProps } from "./types";
import { Employee } from "@/app/types/employee";

export default function EmployeeTableBody({
  employees,
  page,
  rowsPerPage,
}: EmployeeTableBodyProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleOpenEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
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
              {page * rowsPerPage + index + 1}
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {employee.firstName} {employee.lastName}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {employee.address}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {employee.phoneNumber}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {employee.gender}
              </Typography>
            </TableCell>
            <TableCell>
              <Tooltip
                title={`Total score counted with this formula : totalAverageWeightRatings * 1000000 + numberOfRents * 1000 + recentlyActive`}
                arrow
              >
                <Typography sx={{ color: "#00796b" }}>
                  {employee.totalLeave ?? 0}
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell>
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
    </>
  );
}
