import { Admin } from "@/app/types/admin";

export interface AdminTableBodyProps {
  admins: Admin[];
  page: number;
  rowsPerPage: number;
}
