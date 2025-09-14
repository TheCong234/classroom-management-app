import ChatServices from "../services/chat.service.js";
import statusCode from "../constants/status-code.js";
import BaseResponse from "../config/base-response.js";

const ChatControllers = {
  async sendMessage(req, res) {
    const sender = req.user.phone;
    const { messageId, receiver, text } = req.body;
    try {
      const result = await ChatServices.sendMessage(messageId, sender, receiver, text);
      return res.status(statusCode.OK).json(BaseResponse.success("create success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async getConversation(req, res) {
    const currentPhone = req.user.phone;
    const otherPhone = req.params.phone;
    try {
      const result = await ChatServices.getConversation(currentPhone, otherPhone);
      return res.status(statusCode.OK).json(BaseResponse.success("get success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async getMyConversations(req, res) {
    const { phone } = req.user;
    try {
      const result = await ChatServices.getMyConversations(phone);
      return res.status(statusCode.OK).json(BaseResponse.success("get success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },
};

export default ChatControllers;
