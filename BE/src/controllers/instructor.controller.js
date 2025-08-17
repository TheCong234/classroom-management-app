import BaseResponse from "../config/base-response.js";
import statusCode from "../constants/status-code.js";
import InstructorServices from "../services/instructor.service.js";

const InstructorControllers = {
  async addStudent(req, res) {
    const { name, phone, email, address } = req.body;
    try {
      const result = await InstructorServices.addStudent(phone, {
        name,
        email,
        role: "student",
        address,
        status: true,
        lessons: [],
      });
      return res.status(statusCode.OK).json(BaseResponse.success("create success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async assignLesson(req, res) {
    const { studentPhone, title, description } = req.body;
    try {
      const result = await InstructorServices.assignLesson(studentPhone, { title, description, completed: false });
      return res.status(statusCode.OK).json(BaseResponse.success("assign success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async getStudents(req, res) {
    try {
      const result = await InstructorServices.getStudents();
      return res.status(statusCode.OK).json(BaseResponse.success("get success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async getStudentProfile(req, res) {
    const { phone } = req.params;
    try {
      const result = await InstructorServices.getStudentProfile(phone);
      return res.status(statusCode.OK).json(BaseResponse.success("get success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async editStudent(req, res) {
    const { phone } = req.params;
    const data = req.body;
    try {
      const result = await InstructorServices.editStudent(phone, data);
      return res.status(statusCode.OK).json(BaseResponse.success("update success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },

  async deleteStudent(req, res) {
    const { phone } = req.params;
    try {
      const result = await InstructorServices.deleteStudent(phone);
      return res.status(statusCode.OK).json(BaseResponse.success("delete success", result));
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(BaseResponse.error(error.message, error));
    }
  },
};

export default InstructorControllers;
