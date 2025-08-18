import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import studentReducer from "./slices/studentSlice.js";
import instructorReducer from "./slices/instructorSlice.js";
import chatReducer from "./slices/chatSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    instructor: instructorReducer,
    chat: chatReducer,
  },
});

export default store;
