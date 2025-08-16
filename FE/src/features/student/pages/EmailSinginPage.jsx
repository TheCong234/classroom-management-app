import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailSigninSchema } from "../../../validations/emailSigninSchema.js";
import useStudent from "../../../hooks/useStudent.js";

export default function EmailSinginPage() {
  const navigate = useNavigate();
  const { hanldeCreateAccessCodeByEmail } = useStudent();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSigninSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await hanldeCreateAccessCodeByEmail(data);
      if (result.payload.success === false) {
        alert(result.payload.message);
        return;
      }
      localStorage.setItem("email", data.email);
      navigate("/email-verification");
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
      <h2 className="font-bold text-[25px] text-center mt-1">Sign In</h2>
      <p className="text-sm text-center mt-3 text-gray-400">Please enter your Email to sign in</p>
      <input
        {...register("email")}
        type="text"
        placeholder="Your Email Address"
        className="border-[1px] border-[#9095A1] px-3 py-2 w-full mt-10 rounded-md text-sm"
      />
      {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
      <button type="submit" className="mt-6 rounded-md bg-blue-500 w-full py-2 text-white text-sm">
        Next
      </button>
      <p className="text-sm text-center mt-4">passwordless authentication methods.</p>
      <p className="text-[13px] absolute bottom-4 left-6">
        Don’t having account? <span className="text-blue-500">Sign up</span>
      </p>
    </form>
  );
}
