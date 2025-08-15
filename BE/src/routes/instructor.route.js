import express from "express";
import { isInstructor, verifyToken } from "../middlewares/auth.middleware.js";
import InstructorControllers from "../controllers/instructor.controller.js";
const instructorRoutes = express.Router();

instructorRoutes.post("/addStudent", verifyToken, isInstructor, InstructorControllers.addStudent);
instructorRoutes.post("/assignLesson", verifyToken, isInstructor, InstructorControllers.assignLesson);

instructorRoutes.get("/students", verifyToken, isInstructor, InstructorControllers.getStudents);
instructorRoutes.get("/student/:phone", verifyToken, isInstructor, InstructorControllers.getStudentProfile);

instructorRoutes.put("/editStudent/:phone", verifyToken, isInstructor, InstructorControllers.editStudent);

instructorRoutes.delete("/student/:phone", verifyToken, isInstructor, InstructorControllers.deleteStudent);

export default instructorRoutes;
