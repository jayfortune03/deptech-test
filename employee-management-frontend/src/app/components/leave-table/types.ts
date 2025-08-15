import { Leave } from "@/app/types/leave";

export interface LeaveTableProps {
  leaves: Leave[];
  loading: boolean;
  error: string;
  page: number;
  rowsPerPage: number;
  totalLeaves: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
