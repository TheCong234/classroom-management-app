import { useDispatch, useSelector } from "react-redux";
import {
  addStudentAction,
  assignLessonAction,
  deleteStudentAction,
  editStudentAction,
  getAllStudentsAction,
  getStudentProfileAction,
} from "../redux/actions/instructorActions.js";

const useInstructor = () => {
  const dispatch = useDispatch();
  const { error, loading, studentData, studentProfile } = useSelector((state) => state.instructor);

  const handleGetAllStudents = async (data) => {
    return dispatch(getAllStudentsAction(data));
  };

  const handleAddStudent = async (data) => {
    return dispatch(addStudentAction(data));
  };

  const handleEditStudent = async (data) => {
    return dispatch(editStudentAction(data));
  };

  const handleGetStudentProfile = async (data) => {
    return dispatch(getStudentProfileAction(data));
  };

  const handleDeleteStudent = async (data) => {
    return dispatch(deleteStudentAction(data));
  };

  const handleAssignLesson = async (data) => {
    return dispatch(assignLessonAction(data));
  };
  return {
    error,
    loading,
    studentData,
    studentProfile,
    handleGetAllStudents,
    handleAddStudent,
    handleEditStudent,
    handleGetStudentProfile,
    handleDeleteStudent,
    handleAssignLesson,
  };
};

export default useInstructor;
