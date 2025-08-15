import { Admin } from "./admin";

export interface AdminsState {
  admins: Admin[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalAdmins: number;
}
