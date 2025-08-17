import express from "express";
import AuthControllers from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/createAccessCode", AuthControllers.createAccessCode);
authRoutes.post("/validateAccessCode", AuthControllers.validateAccessCode);

authRoutes.get("/myProfile", verifyToken, AuthControllers.getMyProfile);

export default authRoutes;
