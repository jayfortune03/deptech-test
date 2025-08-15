import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required!"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Email address is invalid!")
    .required("Email is required!"),
  birthDate: Yup.date().required("Birth date is required!"),
  password: Yup.string().required("Password is required!"),
  gender: Yup.string()
    .oneOf(["Male", "Female"], "Invalid gender!")
    .required("Gender is required!"),
});

export const validationSchemaRenderValue: {
  label: string;
  value:
    | "firstName"
    | "lastName"
    | "email"
    | "birthDate"
    | "password"
    | "gender";
}[] = [
  {
    value: "firstName",
    label: "First Name",
  },
  {
    value: "lastName",
    label: "Last Name",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "birthDate",
    label: "Birth Date",
  },
  {
    value: "password",
    label: "Password",
  },
  {
    value: "gender",
    label: "Gender",
  },
];
