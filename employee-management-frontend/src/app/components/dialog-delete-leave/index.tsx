import axiosInstance from "@/app/lib/axios";
import { fetchLeavesStart, fetchLeavesSuccess } from "@/app/store/leaveSlice";
import { Leave } from "@/app/types/leave";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function DialogDeleteLeave({
  open,
  onClose,
  leave,
}: {
  open: boolean;
  onClose: () => void;
  leave: Leave;
}) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/leaves/${leave.id}`);

      dispatch(fetchLeavesStart());
      const leavesResponse = await axiosInstance.get(`/leaves`, {
        params: {
          page: 1,
          rowsPerPage: 5,
        },
      });
      dispatch(fetchLeavesSuccess(leavesResponse.data.data));

      alert(
        `Success delete leave ${leave.employee.firstName} ${leave.employee.lastName}`
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
          Are you sure you want to delete the leave {leave.employee.firstName}{" "}
          {leave.employee.lastName}?
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
