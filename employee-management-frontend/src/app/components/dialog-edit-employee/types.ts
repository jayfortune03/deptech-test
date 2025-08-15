import { Employee } from "@/app/types/employee";

export interface EditEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee;
}
