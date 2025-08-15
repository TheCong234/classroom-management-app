import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import instructorRoutes from "./routes/instructor.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.ORIGIN_CORS_CLIENT],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Express + Firebase (ESM) is running" });
});

app.use("/auth", authRoutes);
app.use("/instructor", instructorRoutes);

app.listen(3000, () => {
  const PORT = process.env.PORT || 8888;
  console.log(`SERVER ON PORT: ${PORT}`);
});
