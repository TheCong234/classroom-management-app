import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function InstructorLayout() {
  const { currentUser, hanldeSignout } = useAuth();
  const onSignout = () => {
    hanldeSignout();
  };
  return (
    <div className="h-screen flex">
      <aside className="w-[280px] py-4 px-6">
        <div className="w-full h-[69px]  bg-gray-300 rounded-md p-2 flex gap-2 items-center">
          <div>
            <img src="/images/logo-skipli.png" width={"42px"} alt="Logo" />
          </div>
          <div>
            <p className="font-bold flex">
              Hi!{" "}
              <span className="text-blue-600 truncate block max-w-[100px] ">
                {currentUser?.name}
              </span>
            </p>
            <p className="text-xs text-gray-500">{currentUser?.role}</p>
          </div>
        </div>
        <nav className=" h-full mt-4">
          <ul>
            <li>
              <NavLink
                to="students"
                className={({ isActive }) =>
                  `w-full px-4 py-3 text-[#2C7BE5]  flex items-center ${
                    isActive ? "bg-blue-100  border-r-4 border-[#2C7BE5]" : "hover:bg-blue-50"
                  }`
                }
              >
                <div className="w-full">Manage Students</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="lessons"
                className={({ isActive }) =>
                  `w-full px-4 py-3 text-[#2C7BE5]  flex items-center ${
                    isActive ? "bg-blue-100  border-r-4 border-[#2C7BE5]" : "hover:bg-blue-50"
                  }`
                }
              >
                <div className="w-full">Manage Lessons</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="messages"
                className={({ isActive }) =>
                  `w-full px-4 py-3 text-[#2C7BE5]  flex items-center ${
                    isActive ? "bg-blue-100  border-r-4 border-[#2C7BE5]" : "hover:bg-blue-50"
                  }`
                }
              >
                <div className="w-full">Manage Messages</div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="w-full">
        <header className="py-4 px-10">
          <div className="w-full h-[69px] flex gap-3 items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M10.5 8.25h3l-3 4.5h3"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
              onClick={onSignout}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>

            <div className="rounded-full overflow-hidden border">
              <img src="/images/no-avatar.jpg" width={"42px"} height={"42px"} />
            </div>
          </div>
        </header>
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
