import { createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../../services/authService.js";

export const createAccessCodeByPhoneAction = createAsyncThunk(
  "auth/create-access-code-by-phone",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authServices.createAccessCodeByPhone(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "createAccessCodeByPhone failed");
    }
  }
);

export const validateAccessCodeByPhoneAction = createAsyncThunk(
  "auth/validate-access-code-by-phone",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authServices.validateAccessCodeByPhone(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "validateAccessCodeByPhone failed");
    }
  }
);

export const getMyProfileAction = createAsyncThunk(
  "auth/get-my-profile-action",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authServices.getMyProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "getMyProfile failed");
    }
  }
);
