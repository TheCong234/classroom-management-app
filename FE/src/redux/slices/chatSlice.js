import { createSlice } from "@reduxjs/toolkit";
import {
  getConversationAction,
  getMyConversationsAction,
  sendMessageAction,
} from "../actions/chatActions.js";

const initialState = {
  loading: false,
  error: null,
  conversation: { phone: "", messages: [] },
  chats: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetState: () => initialState,
    updateConversation: (state, action) => {
      console.log("actionnnn: ", action);

      const { participants, newMessage } = action.payload;
      if (participants.includes(state.conversation.phone)) {
        state.conversation.messages = [...state.conversation.messages, newMessage];
      }
    },
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
        state.conversation.messages.push(action.payload.newMessage);
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
        state.conversation = action.payload;
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
export const { updateConversation } = chatSlice.actions;
