import * as yup from "yup";

export const createStudentSchema = yup.object().shape({
  name: yup.string().required("Student name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number is invalid"),
  email: yup.string().required("Email address is required").email("Email address is invalid"),
  role: yup.string().required("Role is required"),
  address: yup.string().required("Address is required"),
});
