import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";
import { getToken } from "./utils/localStoreHelper.js";

const App = () => {
  const { hanldeGetMyProfile } = useAuth();

  const onFetchData = async () => {
    await hanldeGetMyProfile();
  };
  useEffect(() => {
    if (getToken) {
      onFetchData();
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
