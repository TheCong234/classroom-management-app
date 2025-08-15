import BaseResponse from "../config/base-response.js";
import statusCode from "../constants/status-code.js";
import AuthServices from "../services/auth.service.js";

const AuthControllers = {
  async createAccessCode(req, res) {
    const { phone } = req.body;
    try {
      const result = await AuthServices.createAccessCode(phone);
      return res.status(statusCode.OK).json(BaseResponse.success("create success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async validateAccessCode(req, res) {
    const { phone, accessCode } = req.body;
    try {
      const result = await AuthServices.validateAccessCode(phone, accessCode);
      return res.status(statusCode.OK).json(BaseResponse.success("validate success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },
};

export default AuthControllers;
