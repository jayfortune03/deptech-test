import { User } from "./user";

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  rowsPerPage: number;
  totalUsers: number;
}
