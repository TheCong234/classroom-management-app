import * as yup from "yup";

export const accessCodeSchema = yup
  .object({
    accessCode: yup
      .string()
      .required("Code is required")
      .matches(/^\d{6}$/, "Code is not valid"),
  })
  .required();
