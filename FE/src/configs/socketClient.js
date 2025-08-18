import { io } from "socket.io-client";
import { BACKEND_URL } from "../environments/index.js";

const socket = io(BACKEND_URL);

export default socket;
