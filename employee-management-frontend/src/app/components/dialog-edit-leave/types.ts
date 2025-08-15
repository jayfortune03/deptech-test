import { Leave } from "@/app/types/leave";

export interface EditLeaveDialogProps {
  open: boolean;
  onClose: () => void;
  leave: Leave;
}
