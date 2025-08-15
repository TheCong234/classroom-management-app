import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative min-h-[100vh]">
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4/5 ">
        <Outlet />
      </div>
    </div>
  );
}
