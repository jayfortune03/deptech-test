import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required!"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Email address is invalid!")
    .required("Email is required!"),
  phoneNumber: Yup.string().required("Phone Number is required!"),
  address: Yup.string().required("Address is required"),
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
    | "phoneNumber"
    | "address"
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
    value: "phoneNumber",
    label: "Phone Number",
  },
  {
    value: "address",
    label: "Address",
  },
  {
    value: "gender",
    label: "Gender",
  },
];
