import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes.jsx";

// Lazy load layouts
const App = lazy(() => import("../App.jsx"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout.jsx"));
const InstructorLayout = lazy(() => import("../layouts/InstructorLayout.jsx"));
const StudentLayout = lazy(() => import("../layouts/StudentLayout.jsx"));

//lazy load pages
const PhoneSigninPage = lazy(() => import("../features/auth/pages/PhoneSigninPage.jsx"));
const EmailSigninPage = lazy(() => import("../features/student/pages/EmailSinginPage.jsx"));
const PhoneVerificationPage = lazy(() =>
  import("../features/auth/pages/PhoneVerificationPage.jsx")
);
const EmailVerificationPage = lazy(() =>
  import("../features/student/pages/EmailVerificationPage.jsx")
);
const InsStudentsPage = lazy(() => import("../features/instructor/pages/StudentsPage.jsx"));
const InsLessonsPage = lazy(() => import("../features/instructor/pages/LessonsPage.jsx"));
const StuLessonsPage = lazy(() => import("../features/student/pages/LessonsPage.jsx"));
const StuMessagesPage = lazy(() => import("../features/student/pages/MessagesPage.jsx"));
const ChatContentSection = lazy(() =>
  import("../features/student/components/ChatContentSection.jsx")
);

const routesConfig = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/signin" replace />,
          },
          {
            path: "signin",
            element: <PhoneSigninPage />,
          },
          {
            path: "phone-verification",
            element: <PhoneVerificationPage />,
          },
          {
            path: "email-signin",
            element: <EmailSigninPage />,
          },
          {
            path: "email-verification",
            element: <EmailVerificationPage />,
          },
        ],
      },
      {
        path: "/instructor",
        element: (
          <ProtectedRoute requiredRole={"instructor"}>
            <InstructorLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="students" replace />,
          },
          {
            path: "students",
            element: <InsStudentsPage />,
          },
          {
            path: "lessons",
            element: <InsLessonsPage />,
          },
          {
            path: "messages",
            element: <StuMessagesPage />,
            children: [
              {
                path: ":phone",
                element: <ChatContentSection />,
              },
            ],
          },
        ],
      },
      {
        path: "/student",
        element: (
          <ProtectedRoute requiredRole={"student"}>
            <StudentLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to="lessons" replace />,
          },
          {
            path: "lessons",
            element: <StuLessonsPage />,
          },
          {
            path: "messages",
            element: <StuMessagesPage />,
            children: [
              {
                path: ":phone",
                element: <ChatContentSection />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routesConfig);
export default router;
