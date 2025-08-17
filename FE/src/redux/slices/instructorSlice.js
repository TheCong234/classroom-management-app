import { createSlice } from "@reduxjs/toolkit";
import {
  addStudentAction,
  deleteStudentAction,
  editStudentAction,
  getAllStudentsAction,
  getStudentProfileAction,
} from "../actions/instructorActions.js";

const initialState = {
  loading: false,
  error: null,
  studentData: { total: 0, students: [] },
  studentProfile: null,
};
const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //get all students
      .addCase(getAllStudentsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStudentsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.studentData = action.payload;
      })
      .addCase(getAllStudentsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add student
      .addCase(addStudentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.studentData.students.push(action.payload);
        state.studentData.total += 1;
      })
      .addCase(addStudentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //edit student
      .addCase(editStudentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editStudentAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.studentData.students.findIndex(
          (student) => student.phone === action.payload.phone
        );
        state.studentData.students[index] = action.payload;
      })
      .addCase(editStudentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get student profile
      .addCase(getStudentProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfile = action.payload;
      })
      .addCase(getStudentProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete student
      .addCase(deleteStudentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.studentData.students = state.studentData.students.filter(
          (student) => student.phone !== action.payload.phone
        );
      })
      .addCase(deleteStudentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default instructorSlice.reducer;
