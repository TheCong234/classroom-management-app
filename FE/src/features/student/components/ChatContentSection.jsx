import { useEffect, useState } from "react";
import useChat from "../../../hooks/useChat.js";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import { v4 as uuidv4 } from "uuid";

const ChatContentSection = () => {
  const {
    loading,
    conversation,
    hanldeSendMessage,
    hanldeGetConversation,
    hanldeAddNewMessageSent,
  } = useChat();
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const { phone } = useParams();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (text.trim()) {
        onSubmit(text);
        setText("");
      }
    }
  };

  const onSubmit = async () => {
    const messageId = uuidv4();
    try {
      hanldeAddNewMessageSent({ id: messageId, sender: currentUser.phone, receiver: phone, text });
      const result = await hanldeSendMessage({ messageId: messageId, receiver: phone, text });
      const resData = result.payload;
      if (resData.success === false) {
        return alert(resData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (phone) {
      hanldeGetConversation({ phone });
    }
  }, [phone]);
  return (
    <div className="bg-[#F6F6F6] rounded-3xl overflow-hidden w-full mx-10  flex flex-col justify-between">
      <div className="px-6 pt-6 h-full overflow-y-scroll pb-4">
        {conversation &&
          conversation.messages.map((mess) => (
            <div
              key={mess.id}
              className={`flex ${
                mess.sender === currentUser.phone ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs mt-1 shadow-2xl ${
                  mess.sender === currentUser.phone
                    ? "bg-blue-500 text-white border-[1px] border-gray-300 rounded"
                    : "bg-white text-black border-[1px] border-gray-300 rounded"
                }`}
              >
                {mess.text}
              </div>
            </div>
          ))}
      </div>
      <div className="bg-gray-400 px-6 py-3">
        <input
          type="text"
          value={text}
          placeholder="Reply message ..."
          className="w-full  focus:outline-none focus:ring-0"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatContentSection;
