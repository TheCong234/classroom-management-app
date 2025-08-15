import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "./styles/main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
