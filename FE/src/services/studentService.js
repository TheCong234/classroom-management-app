import axiosClient from "../configs/apiClient.js";

const studentServices = {
  createAccessCodeByEmail: (data) => {
    return axiosClient.post("/student/signinEmail", data);
  },

  validateAccessCodeByEmail: (data) => {
    return axiosClient.post("/student/validateAccessCode", data);
  },
};

export default studentServices;
