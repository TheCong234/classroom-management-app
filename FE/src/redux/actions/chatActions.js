import { createAsyncThunk } from "@reduxjs/toolkit";
import chatServices from "../../services/chatService.js";

export const sendMessageAction = createAsyncThunk(
  "chat/send-message",
  async (data, { rejectWithValue }) => {
    try {
      const response = await chatServices.sendMessage(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "sendMessageAction failed");
    }
  }
);

export const getConversationAction = createAsyncThunk(
  "chat/get-conversation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await chatServices.getConversation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "getConversationAction failed");
    }
  }
);

export const getMyConversationsAction = createAsyncThunk(
  "chat/get-my-conversations",
  async (data, { rejectWithValue }) => {
    try {
      const response = await chatServices.getMyConversations(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "getMyConversationsAction failed");
    }
  }
);
