import { createSlice } from "@reduxjs/toolkit";
import {
  createAccessCodeByEmailAction,
  getMyLessonsAction,
  markLessonDoneAction,
} from "../actions/studentAction.js";

const initialState = {
  loading: false,
  error: null,
  myLessons: { total: 0, lessons: [] },
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

      //getMyLessons
      .addCase(getMyLessonsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyLessonsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.myLessons = action.payload;
      })
      .addCase(getMyLessonsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //markLessonDone
      .addCase(markLessonDoneAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markLessonDoneAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.myLessons.lessons.findIndex(
          (lesson) => lesson.id === action.payload.id
        );
        state.myLessons.lessons[index] = action.payload;
      })
      .addCase(markLessonDoneAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
