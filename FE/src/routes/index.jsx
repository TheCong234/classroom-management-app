import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy load layouts
const App = lazy(() => import("../App.jsx"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout.jsx"));
const InstructorLayout = lazy(() => import("../layouts/InstructorLayout.jsx"));
const StudentLayout = lazy(() => import("../layouts/StudentLayout.jsx"));

//lazy load pages
const SigninPage = lazy(() => import("../features/auth/pages/SinginPage.jsx"));
const PhoneVerificationPage = lazy(() =>
  import("../features/auth/pages/PhoneVerificationPage.jsx")
);
const InsStudentsPage = lazy(() => import("../features/instructor/pages/StudentsPage.jsx"));
const InsLessonsPage = lazy(() => import("../features/instructor/pages/LessonsPage.jsx"));
const InsMessagesPage = lazy(() => import("../features/instructor/pages/MessagesPage.jsx"));
const StuLessonsPage = lazy(() => import("../features/student/pages/LessonsPage.jsx"));
const StuMessagesPage = lazy(() => import("../features/student/pages/MessagesPage.jsx"));

const routesConfig = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "signin",
            element: <SigninPage />,
          },
          {
            path: "phone-verification",
            element: <PhoneVerificationPage />,
          },
        ],
      },
      {
        path: "/instructor",
        element: <InstructorLayout />,
        children: [
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
            element: <InsMessagesPage />,
          },
        ],
      },
      {
        path: "/student",
        element: <StudentLayout />,
        children: [
          {
            path: "lessons",
            element: <StuLessonsPage />,
          },
          {
            path: "messages",
            element: <StuMessagesPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routesConfig);
export default router;
