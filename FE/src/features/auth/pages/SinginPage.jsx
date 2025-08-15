import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signinSchema } from "../../../validations/signinSchema.js";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = (data) => {
    console.log("Dữ liệu:", data);
    navigate("/phone-verification");
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
      <p className="text-sm text-center mt-3 text-gray-400">Please enter your phone to sign in</p>
      <input
        {...register("phone")}
        type="text"
        placeholder="Your Phone Number"
        className="border-[1px] border-[#9095A1] px-3 py-2 w-full mt-10 rounded-md text-sm"
      />
      {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone.message}</p>}
      <button type="submit" className="mt-6 rounded-md bg-blue-500 w-full py-2 text-white text-sm">
        Next
      </button>
      <p className="text-sm text-center mt-4">passwordless authentication methods.</p>
      <p className="text-[13px] absolute bottom-4 left-6">
        Don’t having account?{" "}
        <Link to={"/signup"} className="text-blue-500">
          Sign up
        </Link>
      </p>
    </form>
  );
}
