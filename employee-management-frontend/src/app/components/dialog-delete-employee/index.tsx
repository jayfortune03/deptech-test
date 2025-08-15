import axiosInstance from "@/app/lib/axios";
import {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
} from "@/app/store/employeeSlice";
import { Employee } from "@/app/types/employee";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function DialogDeleteEmployee({
  open,
  onClose,
  employee,
}: {
  open: boolean;
  onClose: () => void;
  employee: Employee;
}) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/employees/${employee.id}`);

      dispatch(fetchEmployeesStart());
      const employeesResponse = await axiosInstance.get(`/employees`, {
        params: {
          page: 1,
          rowsPerPage: 5,
        },
      });
      dispatch(fetchEmployeesSuccess(employeesResponse.data.data));

      alert(
        `Success delete employee ${employee.firstName} ${employee.lastName}`
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 400) {
        alert("You cannot delete yourself!");
      }
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#d32f2f", color: "white" }}>
        Confirm Deletion
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fafafa",
          padding: "2rem",
        }}
      >
        <p>
          Are you sure you want to delete the employee {employee.firstName}{" "}
          {employee.lastName}?
        </p>
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
          onClick={handleDelete}
          color="primary"
          sx={{
            backgroundColor: "#00796b",
            color: "white",
            "&:hover": {
              backgroundColor: "#004d40",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
