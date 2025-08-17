import { Navigate, useNavigate } from "react-router-dom";
import { getToken } from "../utils/localStoreHelper.js";
import useAuth from "../hooks/useAuth.js";
import { useEffect } from "react";

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const token = getToken();
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/signin");
//       return;
//     }
//     if (currentUser) {
//       if (requiredRole === "instructor") {
//         if (currentUser?.role !== "instructor") {
//           console.log("You must be a Instructor");

//           alert("You must be a Instructor");
//           navigate("/signin");
//           return;
//         }
//         return children;
//       } else if (requiredRole === "student") {
//         if (currentUser?.role !== "student") {
//           alert("You must be a Student");
//           console.log("You must be a student");
//           navigate("/signin");
//           return;
//         }
//         return children;
//       }
//     }
//   }, [currentUser]);
// };

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = getToken();
  const { currentUser } = useAuth();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  if (requiredRole === "instructor" && currentUser?.role !== "instructor") {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole === "student" && currentUser?.role !== "student") {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
export default ProtectedRoute;
