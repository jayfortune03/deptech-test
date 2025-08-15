import { Leave } from "./leave";

export interface LeaveState {
  leaves: Leave[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalLeaves: number;
}
