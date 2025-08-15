import express from "express";
import AuthControllers from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/createAccessCode", AuthControllers.createAccessCode);
authRoutes.post("/validateAccessCode", AuthControllers.validateAccessCode);

export default authRoutes;
