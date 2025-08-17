import axiosClient from "../configs/apiClient.js";
import { getToken } from "../utils/localStoreHelper.js";

const authServices = {
  createAccessCodeByPhone: (data) => {
    return axiosClient.post("/auth/createAccessCode", data);
  },

  validateAccessCodeByPhone: (data) => {
    return axiosClient.post("/auth/validateAccessCode", data);
  },

  getMyProfile: () => {
    return axiosClient.get("/auth/myProfile", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default authServices;
