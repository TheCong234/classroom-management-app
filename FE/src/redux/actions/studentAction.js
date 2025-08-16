import { createAsyncThunk } from "@reduxjs/toolkit";
import studentServices from "../../services/studentService.js";

export const createAccessCodeByEmailAction = createAsyncThunk(
  "student/create-access-code-by-email",
  async (data, { rejectWithValue }) => {
    try {
      const response = await studentServices.createAccessCodeByEmail(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "createAccessCodeByEmail failed");
    }
  }
);

export const validateAccessCodeByEmailAction = createAsyncThunk(
  "student/validate-access-code-by-email",
  async (data, { rejectWithValue }) => {
    try {
      const response = await studentServices.validateAccessCodeByEmail(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "validateAccessCodeByEmail failed");
    }
  }
);
