import { useDispatch, useSelector } from "react-redux";
import {
  createAccessCodeByEmailAction,
  validateAccessCodeByEmailAction,
} from "../redux/actions/studentAction.js";

const useStudent = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.student);

  const hanldeCreateAccessCodeByEmail = async (data) => {
    return dispatch(createAccessCodeByEmailAction(data));
  };

  const hanldeValidateAccessCodeByEmail = async (data) => {
    return dispatch(validateAccessCodeByEmailAction(data));
  };

  return {
    error,
    loading,
    hanldeCreateAccessCodeByEmail,
    hanldeValidateAccessCodeByEmail,
  };
};

export default useStudent;
