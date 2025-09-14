import { useDispatch, useSelector } from "react-redux";
import {
  getConversationAction,
  getMyConversationsAction,
  sendMessageAction,
} from "../redux/actions/chatActions.js";
import { addNewMessageSent, updateConversation } from "../redux/slices/chatSlice.js";

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

  const hanldeUpdateConversation = async (data) => {
    return dispatch(updateConversation(data));
  };

  const hanldeAddNewMessageSent = async (data) => {
    return dispatch(addNewMessageSent(data));
  };

  return {
    error,
    loading,
    conversation,
    chats,
    hanldeSendMessage,
    hanldeGetConversation,
    hanldeGetMyConversations,
    hanldeUpdateConversation,
    hanldeAddNewMessageSent,
  };
};

export default useChat;
