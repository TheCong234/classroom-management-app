import { createSlice } from "@reduxjs/toolkit";
import {
  createAccessCodeByPhoneAction,
  validateAccessCodeByPhoneAction,
} from "../actions/authActions.js";

const initialState = {
  // token: getToken() || null,
  loading: false,
  error: null,
  currentUser: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //createAccessCodeByPhone
      .addCase(createAccessCodeByPhoneAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccessCodeByPhoneAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAccessCodeByPhoneAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //validateAccessCodeByPhone
      .addCase(validateAccessCodeByPhoneAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateAccessCodeByPhoneAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(validateAccessCodeByPhoneAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
