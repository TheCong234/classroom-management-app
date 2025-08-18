import { useDispatch, useSelector } from "react-redux";
import {
  getConversationAction,
  getMyConversationsAction,
  sendMessageAction,
} from "../redux/actions/chatActions.js";

const useChat = () => {
  const dispatch = useDispatch();
  const { error, loading, conversation, chats } = useSelector((state) => state.chat);

  const hanldeSendMessage = async (data) => {
    return dispatch(sendMessageAction(data));
  };

  const hanldeGetConversation = async (data) => {
    return dispatch(getConversationAction(data));
  };

  const hanldeGetMyConversations = async (data) => {
    return dispatch(getMyConversationsAction(data));
  };

  return {
    error,
    loading,
    conversation,
    chats,
    hanldeSendMessage,
    hanldeGetConversation,
    hanldeGetMyConversations,
  };
};

export default useChat;
