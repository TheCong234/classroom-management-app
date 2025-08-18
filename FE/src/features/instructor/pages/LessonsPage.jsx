import { useEffect, useState } from "react";
import useInstructor from "../../../hooks/useInstructor.js";
import CreateLessonModal from "../components/CreateLessonModal.jsx";

export default function LessonPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { loading, studentData, handleGetAllStudents, handleDeleteStudent } = useInstructor();

  useEffect(() => {
    handleGetAllStudents();
  }, []);
  return (
    <div className="h-full">
      <div className="min-h-[70vh] rounded-xl border border-gray-50 shadow">
        <h2 className="font-medium text-[25px] px-10 py-6 border-b-[1px] border-gray-100 ">
          Management Lessons
        </h2>
        <div className="flex items-center justify-between px-10">
          <h3 className="font-medium text-[20px]  py-6 border-b-[1px] border-gray-100">
            {studentData?.total} Lessons
          </h3>
          <div className="flex ">
            <button
              className="flex gap-2 text-[15px] border-[1px] border-[#2C7BE5] bg-[#F3F8FF] px-4 py-2 rounded-sm"
              onClick={() => setOpenCreateModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Lesson
            </button>
            <button className="ml-4 text-[15px] flex gap-2 border-[1px] border-[#E3E3E3] px-4 py-2 rounded-sm">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* create model */}
      {openCreateModal && <CreateLessonModal onClose={() => setOpenCreateModal(false)} />}
    </div>
  );
}
