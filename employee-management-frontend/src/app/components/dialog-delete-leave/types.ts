import { Admin } from "@/app/types/admin";

export interface EditAdminDialogProps {
  open: boolean;
  onClose: () => void;
  admin: Admin;
}
