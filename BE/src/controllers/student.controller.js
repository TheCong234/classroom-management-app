import BaseResponse from "../config/base-response.js";
import statusCode from "../constants/status-code.js";
import StudentServices from "../services/student.service.js";

const StudentControllers = {
  async signinEmail(req, res) {
    const { email } = req.body;
    try {
      const result = await StudentServices.signinEmail(email);
      return res.status(statusCode.OK).json(BaseResponse.success("signin success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async validateAccessCodeWidthEmail(req, res) {
    const { email, accessCode } = req.body;
    try {
      const result = await StudentServices.validateAccessCodeWidthEmail(email, accessCode);
      return res.status(statusCode.OK).json(BaseResponse.success("validate success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async getMyLessons(req, res) {
    const { phone } = req.user;
    try {
      const result = await StudentServices.getMyLessons(phone);
      return res.status(statusCode.OK).json(BaseResponse.success("get success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async markLessonDone(req, res) {
    const { lessonId } = req.body;
    const { phone } = req.user;
    try {
      const result = await StudentServices.markLessonDone(phone, lessonId);
      return res.status(statusCode.OK).json(BaseResponse.success("update success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async editProfile(req, res) {
    const { phone } = req.user;
    const data = req.body;
    try {
      const result = await StudentServices.editProfile(phone, data);
      return res.status(statusCode.OK).json(BaseResponse.success("update success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },
};

export default StudentControllers;
