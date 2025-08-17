import { createAsyncThunk } from "@reduxjs/toolkit";
import instructorServices from "../../services/instructorService.js";

export const getAllStudentsAction = createAsyncThunk(
  "instructor/get-all-students",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instructorServices.getAllStudents(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "getAllStudentsAction failed");
    }
  }
);

export const addStudentAction = createAsyncThunk(
  "instructor/add-student",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instructorServices.addStudent(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "addStudentAction failed");
    }
  }
);

export const editStudentAction = createAsyncThunk(
  "instructor/edit-student",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instructorServices.editStudent(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "editStudentAction failed");
    }
  }
);

export const getStudentProfileAction = createAsyncThunk(
  "instructor/get-student-profile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instructorServices.getStudentProfile(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "getStudentProfileAction failed");
    }
  }
);

export const deleteStudentAction = createAsyncThunk(
  "instructor/delete-student",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instructorServices.deleteStudent(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "deleteStudentAction failed");
    }
  }
);
