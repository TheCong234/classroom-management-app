import * as yup from "yup";

export const editStudentSchema = yup.object().shape({
  name: yup.string().required("Student name is required"),
  email: yup.string().required("Email address is required").email("Email address is invalid"),
  role: yup.string().required("Role is required"),
  address: yup.string().required("Address is required"),
});
