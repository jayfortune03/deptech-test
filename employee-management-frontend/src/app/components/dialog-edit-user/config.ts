import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  totalAverageWeightRatings: Yup.number()
    .required("Total Average Weight Ratings is required")
    .min(0, "Value must be greater than or equal to 0"),
  numberOfRents: Yup.number()
    .required("Number of Rents is required")
    .min(0, "Value must be greater than or equal to 0"),
  recentlyActive: Yup.number()
    .required("Recently Active is required")
    .min(0, "Value must be greater than or equal to 0"),
});
