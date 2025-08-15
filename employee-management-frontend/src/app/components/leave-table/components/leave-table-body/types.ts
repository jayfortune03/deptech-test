import { Leave } from "@/app/types/leave";

export interface LeaveTableBodyProps {
  leaves: Leave[];
  page: number;
  rowsPerPage: number;
}
