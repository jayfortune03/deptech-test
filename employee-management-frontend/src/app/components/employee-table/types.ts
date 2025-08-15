import { Employee } from "@/app/types/employee";

export interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  error: string;
  page: number;
  rowsPerPage: number;
  totalEmployees: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
