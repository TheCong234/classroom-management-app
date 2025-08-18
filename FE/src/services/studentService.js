import axiosClient from "../configs/apiClient.js";
import { getToken } from "../utils/localStoreHelper.js";

const studentServices = {
  createAccessCodeByEmail: (data) => {
    return axiosClient.post("/student/signinEmail", data);
  },

  validateAccessCodeByEmail: (data) => {
    return axiosClient.post("/student/validateAccessCode", data);
  },

  getMyLessons: (data) => {
    return axiosClient.get("/student/myLessons", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  markLessonDone: (data) => {
    return axiosClient.post("/student/markLessonDone", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default studentServices;
