import axiosClient from "../configs/apiClient.js";
import { getToken } from "../utils/localStoreHelper.js";

const instructorServices = {
  getAllStudents: (data) => {
    return axiosClient.get("/instructor/students", {
      params: data,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  addStudent: (data) => {
    return axiosClient.post("/instructor/addStudent", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  editStudent: (data) => {
    const { phone, ...baseData } = data;
    return axiosClient.put(`/instructor/editStudent/${phone}`, baseData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  getStudentProfile: (data) => {
    return axiosClient.get(`/instructor/student/${data.phone}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  deleteStudent: (data) => {
    return axiosClient.delete(`/instructor/student/${data.phone}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  assignLesson: (data) => {
    return axiosClient.post("/instructor/assignLesson", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default instructorServices;
