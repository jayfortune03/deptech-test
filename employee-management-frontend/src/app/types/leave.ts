import { Employee } from "./employee";

export interface Leave {
  id: number;
  reason: string;
  startDate: Date;
  endDate: Date;
  employeeId: number;
  totalWorkDays: number;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
  remainingLeave: number;
}
