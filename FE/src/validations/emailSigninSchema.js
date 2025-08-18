import * as yup from "yup";

export const emailSigninSchema = yup
  .object({
    email: yup.string().required("Email is required").email("Email address is invalid"),
  })
  .required();
