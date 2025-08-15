import { Employee } from "@/app/types/employee";

export interface EmployeeTableBodyProps {
  employees: Employee[];
  page: number;
  rowsPerPage: number;
}
