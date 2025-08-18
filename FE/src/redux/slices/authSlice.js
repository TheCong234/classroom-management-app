import { createSlice } from "@reduxjs/toolkit";
import {
  createAccessCodeByPhoneAction,
  getMyProfileAction,
  validateAccessCodeByPhoneAction,
} from "../actions/authActions.js";
import { validateAccessCodeByEmailAction } from "../actions/studentAction.js";

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
    signout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("token");
      localStorage.removeItem("phone");
    },
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
        state.currentUser = action.payload.user;
      })
      .addCase(validateAccessCodeByPhoneAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //validateAccessCodeByEmail
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
      })

      //getMyProfile
      .addCase(getMyProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getMyProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { signout } = authSlice.actions;
