import { useDispatch, useSelector } from "react-redux";
import {
  createAccessCodeByPhoneAction,
  getMyProfileAction,
  validateAccessCodeByPhoneAction,
} from "../redux/actions/authActions.js";
import { signout } from "../redux/slices/authSlice.js";

const useAuth = () => {
  const dispatch = useDispatch();
  const { error, loading, currentUser } = useSelector((state) => state.auth);

  const hanldeCreateAccessCodeByPhone = async (data) => {
    return dispatch(createAccessCodeByPhoneAction(data));
  };

  const hanldeValidateAccessCodeByPhone = async (data) => {
    return dispatch(validateAccessCodeByPhoneAction(data));
  };

  const hanldeGetMyProfile = async () => {
    return dispatch(getMyProfileAction());
  };

  const hanldeSignout = async () => {
    return dispatch(signout());
  };

  return {
    error,
    loading,
    currentUser,
    hanldeCreateAccessCodeByPhone,
    hanldeValidateAccessCodeByPhone,
    hanldeGetMyProfile,
    hanldeSignout,
  };
};

export default useAuth;
