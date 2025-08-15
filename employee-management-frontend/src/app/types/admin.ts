export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  password: string;
  gender: "Male" | "Female";
}
