import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import instructorRoutes from "./routes/instructor.route.js";
import studentRoutes from "./routes/student.route.js";
import http from "http";
import initSocket, { setIO } from "./config/socket.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);

app.use(
  cors({
    origin: [process.env.ORIGIN_CORS_CLIENT],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
setIO(io);
initSocket(io);

app.use("/auth", authRoutes);
app.use("/instructor", instructorRoutes);
app.use("/student", studentRoutes);

server.listen(3000, () => {
  const PORT = process.env.PORT || 8888;
  console.log(`SERVER ON PORT: ${PORT}`);
});
