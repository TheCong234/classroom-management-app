import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { accessCodeSchema } from "../../../validations/codeSchema.js";
import { getEmail } from "../../../utils/localStoreHelper.js";
import useStudent from "../../../hooks/useStudent.js";
import useAuth from "../../../hooks/useAuth.js";

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const { hanldeValidateAccessCodeByEmail } = useStudent();
  const { loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accessCodeSchema),
  });

  const onSubmit = async (data) => {
    try {
      const email = getEmail();
      const result = await hanldeValidateAccessCodeByEmail({ ...data, email });
      const resData = result.payload;
      if (resData.success === false) {
        return alert(resData.message);
      }
      localStorage.removeItem(email);
      localStorage.setItem("phone", resData.user.phone);
      localStorage.setItem("token", resData.token);
      if (resData.user.role === "instructor") {
        navigate("/instructor");
      } else if (resData.user.role === "student") {
        navigate("/student");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="w-[360px] h-[379px] bg-white rounded-lg shadow-md py-4 px-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Back button */}
      <button className="flex gap-1 text-xs" type="button" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span className="mt-1 font-medium">Back</span>
      </button>
      <h2 className="font-bold text-[25px] text-center mt-1">Email verification</h2>
      <p className="text-sm text-center mt-3 text-gray-400">
        Please enter your code that send to your Email
      </p>
      <input
        {...register("accessCode")}
        type="text"
        placeholder="Enter Your Code"
        className="border-[1px] border-[#9095A1] px-3 py-2 w-full mt-10 rounded-md text-sm"
      />
      {errors.accessCode && (
        <p className="text-red-500 text-xs mt-2">{errors.accessCode.message}</p>
      )}
      <button
        disabled={loading}
        type="submit"
        className={`mt-6 rounded-md  w-full py-2 text-white text-sm ${
          loading ? "bg-gray-500" : "bg-blue-500"
        }`}
      >
        {loading ? "Loading ..." : "Submit"}
      </button>
      <p className="text-[13px] absolute bottom-4 left-6">
        Code not receive?&nbsp;
        <span className="text-blue-500">Send again</span>
      </p>
    </form>
  );
}
