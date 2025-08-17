import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import studentReducer from "./slices/studentSlice.js";
import instructorReducer from "./slices/instructorSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    instructor: instructorReducer,
  },
});

export default store;
