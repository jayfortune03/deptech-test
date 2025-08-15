import { Employee } from "./employee";

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalEmployees: number;
}
