import { NavLink, Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="h-screen flex">
      <aside className="w-[280px] py-4 px-6">
        <div className="w-full h-[69px]  bg-gray-500"></div>
        <nav className=" h-full mt-4">
          <ul>
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
