import * as Yup from "yup";

export const validationSchema = Yup.object({
  employee: Yup.string().required("Employee must be picked!"),
  reason: Yup.string().required("Reason is required!"),
  startDate: Yup.date().required("Start Date is Required!"),
  endDate: Yup.date().required("End Date is Required!"),
});

export const validationSchemaRenderValue: {
  label: string;
  value: "employee" | "reason" | "startDate" | "endDate";
}[] = [
  {
    value: "employee",
    label: "Employee",
  },
  {
    value: "reason",
    label: "Reason",
  },
  {
    value: "startDate",
    label: "Start Date",
  },
  {
    value: "endDate",
    label: "End Date",
  },
];
