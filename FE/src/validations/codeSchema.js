import * as yup from "yup";

export const codeSchema = yup
  .object({
    phone: yup
      .string()
      .required("Code is required")
      .matches(/^\d{6}$/, "Code is not valid"),
  })
  .required();
