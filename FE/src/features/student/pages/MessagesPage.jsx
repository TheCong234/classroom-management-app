import { NavLink, Outlet } from "react-router-dom";
import useChat from "../../../hooks/useChat.js";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth.js";

const getInfoPartner = (diffEmail, partnerInfos) => {
  const result = partnerInfos.find((p) => p.email !== diffEmail);
  return result;
};

export default function MessagesPage() {
  const { chats, hanldeGetMyConversations } = useChat();
  const { currentUser } = useAuth();

  useEffect(() => {
    hanldeGetMyConversations();
  }, [currentUser]);
  return (
    <div className="flex max-h-[80vh] h-full">
      {/* list chat */}
      <div className="w-[280px]">
        <ul>
          {chats.length &&
            chats.map((chat) => (
              <li key={chat.id}>
                <NavLink
                  to={chat.participants.find((c) => c != currentUser.phone)}
                  className={({ isActive }) =>
                    `w-full px-4 py-3 text-[#2C7BE5]  flex items-center ${
                      isActive ? "bg-blue-100  border-r-4 border-[#2C7BE5]" : "hover:bg-blue-50"
                    }`
                  }
                >
                  <div className="bg-gray-300 rounded-md p-2">
                    <div className="w-full h-[69px]   flex gap-2 items-center">
                      <div>
                        <img
                          src="/images/no-avatar.jpg"
                          width={"42px"}
                          alt="Logo"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-bold flex">
                          <span className="text-blue-600 truncate block max-w-[100px] ">
                            {getInfoPartner(currentUser.email, chat.partnerInfo).name}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {getInfoPartner(currentUser.email, chat.partnerInfo).role}
                        </p>
                      </div>
                    </div>
                    <p className="truncate block max-w-[100px] text-xs">
                      Last: {chat.lastMessage.text}
                    </p>
                  </div>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>

      {/* list mesage of chat */}
      <Outlet />
    </div>
  );
}
