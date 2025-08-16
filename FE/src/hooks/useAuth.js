import { useDispatch, useSelector } from "react-redux";
import {
  createAccessCodeByPhoneAction,
  validateAccessCodeByPhoneAction,
} from "../redux/actions/authActions.js";

const useAuth = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const hanldeCreateAccessCodeByPhone = async (data) => {
    return dispatch(createAccessCodeByPhoneAction(data));
  };

  const hanldeValidateAccessCodeByPhone = async (data) => {
    return dispatch(validateAccessCodeByPhoneAction(data));
  };

  return {
    error,
    loading,
    hanldeCreateAccessCodeByPhone,
    hanldeValidateAccessCodeByPhone,
  };
};

export default useAuth;
