import { createSlice } from "@reduxjs/toolkit";
import {
  getConversationAction,
  getMyConversationsAction,
  sendMessageAction,
} from "../actions/chatActions.js";

const initialState = {
  loading: false,
  error: null,
  conversation: [],
  chats: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //sendMessage
      .addCase(sendMessageAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageAction.fulfilled, (state, action) => {
        state.loading = false;
        state.conversation.push(action.payload.newMessage);
      })
      .addCase(sendMessageAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getConversation
      .addCase(getConversationAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversationAction.fulfilled, (state, action) => {
        state.loading = false;
        state.conversation = action.payload.messages;
      })
      .addCase(getConversationAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getMyConversations
      .addCase(getMyConversationsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyConversationsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload.chats || [];
      })
      .addCase(getMyConversationsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
