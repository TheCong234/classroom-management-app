import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createStudentSchema } from "../../../validations/createStudentSchema.js";
import useInstructor from "../../../hooks/useInstructor.js";

export default function CreateStudentModal({ onClose }) {
  const { loading, handleAddStudent } = useInstructor();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createStudentSchema),
  });

  const onSubmit = async (data) => {
    console.log("Dữ liệu:", data);
    try {
      const result = await handleAddStudent(data);
      if (result.payload.success === false) {
        alert(result.payload.message);
        return;
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center z-10 fixed inset-0  bg-black/30">
      <form
        className="md:w-3xl bg-white rounded-lg shadow py-6 px-8 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-medium text-[25px] text-center">Create Student</h2>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <label htmlFor="studentName" className="text-sm">
              Student Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="text-sm px-4 py-2 border-[1px] border-[#BCBCBC] rounded w-full mt-1"
            />
            {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="text-sm">
              Phone Number
            </label>
            <input
              {...register("phone")}
              type="text"
              id="phone"
              className="text-sm px-4 py-2 border-[1px] border-[#BCBCBC] rounded w-full mt-1"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="text-sm px-4 py-2 border-[1px] border-[#BCBCBC] rounded w-full mt-1"
            />
            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="role" className="text-sm">
              Role
            </label>
            <input
              {...register("role")}
              type="text"
              id="role"
              className="text-sm px-4 py-2 border-[1px] border-[#BCBCBC] rounded w-full mt-1"
            />
            {errors.role && <p className="text-red-500 text-xs mt-2">{errors.role.message}</p>}
          </div>
          <div>
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <input
              {...register("address")}
              type="text"
              id="address"
              className="text-sm px-4 py-2 border-[1px] border-[#BCBCBC] rounded w-full mt-1"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-2">{errors.address.message}</p>
            )}
          </div>
        </div>
        <div className="mt-10 text-end">
          <button className="px-6 py-2 rounded-sm text-sm bg-gray-200" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-sm text-sm  ml-4 text-white ${
              loading ? "bg-gray-500" : "bg-[#2C7BE5]"
            }`}
          >
            {loading ? "Loading ..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
