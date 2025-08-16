import axiosClient from "../configs/apiClient.js";

const authServices = {
  createAccessCodeByPhone: (data) => {
    return axiosClient.post("/auth/createAccessCode", data);
  },

  validateAccessCodeByPhone: (data) => {
    return axiosClient.post("/auth/validateAccessCode", data);
  },
};

export default authServices;
