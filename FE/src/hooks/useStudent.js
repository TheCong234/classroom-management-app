import { useDispatch, useSelector } from "react-redux";
import {
  createAccessCodeByEmailAction,
  getMyLessonsAction,
  markLessonDoneAction,
  validateAccessCodeByEmailAction,
} from "../redux/actions/studentAction.js";

const useStudent = () => {
  const dispatch = useDispatch();
  const { error, loading, myLessons } = useSelector((state) => state.student);

  const hanldeCreateAccessCodeByEmail = async (data) => {
    return dispatch(createAccessCodeByEmailAction(data));
  };

  const hanldeValidateAccessCodeByEmail = async (data) => {
    return dispatch(validateAccessCodeByEmailAction(data));
  };

  const hanldeGetMyLessons = async (data) => {
    return dispatch(getMyLessonsAction(data));
  };

  const hanldeMarkLessonDone = async (data) => {
    return dispatch(markLessonDoneAction(data));
  };

  return {
    error,
    loading,
    myLessons,
    hanldeCreateAccessCodeByEmail,
    hanldeValidateAccessCodeByEmail,
    hanldeGetMyLessons,
    hanldeMarkLessonDone,
  };
};

export default useStudent;
