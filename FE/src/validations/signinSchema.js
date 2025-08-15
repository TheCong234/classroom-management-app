import * as yup from "yup";

export const signinSchema = yup
  .object({
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^(0|\+84)(\d{9})$/, "Phone number is not valid"),
  })
  .required();
