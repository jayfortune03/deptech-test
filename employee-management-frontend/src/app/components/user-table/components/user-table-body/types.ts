import { User } from "@/app/types/user";

export interface UserTableBodyProps {
  users: User[];
  page: number;
  rowsPerPage: number;
}
