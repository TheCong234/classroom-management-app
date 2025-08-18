import axiosClient from "../configs/apiClient.js";
import { getToken } from "../utils/localStoreHelper.js";

const chatServices = {
  sendMessage: (data) => {
    return axiosClient.post("/chat/sendMessage", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  getConversation: (data) => {
    return axiosClient.get(`/chat/conversation/${data.phone}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  getMyConversations: (data) => {
    return axiosClient.get("/chat/conversations", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default chatServices;
