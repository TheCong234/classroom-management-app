import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import ChatControllers from "../controllers/chat.controller.js";

const chatRoutes = express.Router();

chatRoutes.get("/conversation/:phone", verifyToken, ChatControllers.getConversation);
chatRoutes.get("/conversations", verifyToken, ChatControllers.getMyConversations);

chatRoutes.post("/sendMessage", verifyToken, ChatControllers.addStudent);

export default chatRoutes;
