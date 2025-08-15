import axiosInstance from "@/app/lib/axios";
import { fetchAdminsStart, fetchAdminsSuccess } from "@/app/store/adminSlice";
import { Admin } from "@/app/types/admin";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function DialogDeleteAdmin({
  open,
  onClose,
  admin,
}: {
  open: boolean;
  onClose: () => void;
  admin: Admin;
}) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/admins/${admin.id}`);

      dispatch(fetchAdminsStart());
      const adminsResponse = await axiosInstance.get(`/admins`);
      dispatch(fetchAdminsSuccess(adminsResponse.data.data));

      alert(`Success delete admin ${admin.firstName} ${admin.lastName}`);
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
          Are you sure you want to delete the admin {admin.firstName}{" "}
          {admin.lastName}?
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
