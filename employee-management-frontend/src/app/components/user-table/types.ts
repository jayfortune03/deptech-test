import { User } from "@/app/types/user";

export interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string;
  page: number;
  rowsPerPage: number;
  totalUsers: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
