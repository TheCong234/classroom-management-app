import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useInstructor from "../../../hooks/useInstructor.js";
import { useState } from "react";
import { createLessonSchema } from "../../../validations/createLessonSchema.js";

export default function CreateLessonModal({ onClose }) {
  const { studentData, loading, handleAssignLesson } = useInstructor();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createLessonSchema),
  });

  const onSelectedStudent = (phone) => {
    setSelectedStudents((pre) =>
      pre.includes(phone) ? pre.filter((p) => p !== phone) : [...pre, phone]
    );
  };

  const onSubmit = async (data) => {
    console.log("Dữ liệu:", data);
    if (!selectedStudents.length) {
      return alert("Please select min a student");
    }
    try {
      const result = await handleAssignLesson({ studentPhones: selectedStudents, ...data });
      if (result.payload.success === false) {
        alert(result.payload.message);
        return;
      } else {
        alert("Assig successful");
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
        <h2 className="font-medium text-[25px] text-center">Assign Lesson</h2>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className="text-sm px-4 py-2 border-[1px] border-[#BCBCBC] rounded w-full mt-1"
            />
            {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <input
              {...register("description")}
              type="text"
              id="description"
              className="text-sm px-4 py-2 border-[1px] border-[#BCBCBC] rounded w-full mt-1"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-2">{errors.description.message}</p>
            )}
          </div>
        </div>

        <h3 className="font-medium text-[20px]  py-6 border-b-[1px] border-gray-100">Assign to</h3>
        <div className="w-full max-w-md p-4 bg-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-3">Chọn sinh viên</h2>
          <ul className="space-y-2">
            {studentData?.total &&
              studentData.students.map((student) => (
                <li
                  key={student.phone}
                  className=" justify-between p-2 rounded-lg hover:bg-gray-100 flex items-center"
                >
                  <label className="flex items-center space-x-2 cursor-pointer w-full">
                    <input
                      id={`checkbox-${student.phone}`}
                      type="checkbox"
                      checked={selectedStudents.includes(student.phone)}
                      onChange={() => onSelectedStudent(student.phone)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor={`checkbox-${student.phone}`} className="text-gray-800 w-full">
                      {student.name}
                    </label>
                  </label>
                </li>
              ))}
          </ul>
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
