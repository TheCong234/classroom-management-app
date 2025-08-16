import express from "express";
import { isStudent, verifyToken } from "../middlewares/auth.middleware.js";
import StudentControllers from "../controllers/student.controller.js";

const studentRoutes = express.Router();

studentRoutes.post("/signinEmail", StudentControllers.signinEmail);
studentRoutes.post("/validateAccessCodeWidthEmail", StudentControllers.validateAccessCodeWidthEmail);
studentRoutes.post("/markLessonDone", verifyToken, isStudent, StudentControllers.markLessonDone);

studentRoutes.get("/myLessons", verifyToken, isStudent, StudentControllers.getMyLessons);

studentRoutes.put("/editProfile", verifyToken, StudentControllers.editProfile);

export default studentRoutes;
