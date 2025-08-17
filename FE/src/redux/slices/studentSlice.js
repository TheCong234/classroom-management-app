import { createSlice } from "@reduxjs/toolkit";
import {
  createAccessCodeByEmailAction,
  validateAccessCodeByEmailAction,
} from "../actions/studentAction.js";

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //createAccessCodeByEmail
      .addCase(createAccessCodeByEmailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccessCodeByEmailAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAccessCodeByEmailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //validateAccessCodeByPhone
      .addCase(validateAccessCodeByEmailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateAccessCodeByEmailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(validateAccessCodeByEmailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
