import { Admin } from "@/app/types/admin";

export interface AdminTableProps {
  admins: Admin[];
  loading: boolean;
  error: string;
  page: number;
  rowsPerPage: number;
  totalAdmins: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
