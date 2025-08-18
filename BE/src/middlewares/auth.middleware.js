import jwt from "jsonwebtoken";
import statusCode from "../constants/status-code.js";
import BaseResponse from "../config/base-response.js";
import { jwtSecretKey } from "../environments/index.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(statusCode.UNAUTHORIZED).json(BaseResponse.error("Unauthorized", {}));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(statusCode.UNAUTHORIZED)
        .json(BaseResponse.error("Sign session expired, please Sigin again", error));
    }
    return res.status(statusCode.UNAUTHORIZED).json(BaseResponse.error("Unauthorized", error));
  }
};

const isInstructor = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== "instructor") {
    return res.status(statusCode.UNAUTHORIZED).json(BaseResponse.error("No Access", {}));
  }
  next();
};

const isStudent = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== "student") {
    return res.status(statusCode.UNAUTHORIZED).json(BaseResponse.error("No Access", {}));
  }
  next();
};

export { verifyToken, isInstructor, isStudent };
