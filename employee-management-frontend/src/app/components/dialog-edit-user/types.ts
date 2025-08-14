import { User } from "@/app/types/user";

export interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
}
