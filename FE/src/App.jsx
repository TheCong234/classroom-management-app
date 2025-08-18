import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";
import { getToken } from "./utils/localStoreHelper.js";
import socket from "./configs/socketClient.js";
import useChat from "./hooks/useChat.js";

const App = () => {
  const { currentUser, hanldeGetMyProfile } = useAuth();
  const { hanldeUpdateConversation } = useChat();

  const onFetchData = async () => {
    await hanldeGetMyProfile();
  };
  useEffect(() => {
    if (getToken) {
      onFetchData();
    }
  }, []);

  useEffect(() => {
    if (currentUser?.phone) {
      socket.emit("register", currentUser.phone);

      socket.on("message", (data) => {
        console.log("Tin nhan mới:", data);
        hanldeUpdateConversation(data);
        //
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [currentUser]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
