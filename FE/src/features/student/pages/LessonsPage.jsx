import { useEffect, useState } from "react";
import useStudent from "../../../hooks/useStudent.js";

export default function LessonPage() {
  const { loading, myLessons, hanldeGetMyLessons, hanldeMarkLessonDone } = useStudent();
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleMarkDoneClick = async (lessonId) => {
    try {
      const result = await hanldeMarkLessonDone({ lessonId });
      if (result.payload.success === false) {
        alert(result.payload.message);
        return;
      }
      alert("Mark done success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hanldeGetMyLessons();
  }, []);
  return (
    <div className="h-full">
      <div className="min-h-[70vh] rounded-xl border border-gray-50 shadow">
        <h2 className="font-medium text-[25px] px-10 py-6 border-b-[1px] border-gray-100 ">
          Management Lessons
        </h2>
        <div className="flex items-center justify-between px-10">
          <h3 className="font-medium text-[20px]  py-6 border-b-[1px] border-gray-100">
            {myLessons?.total} Lessons
          </h3>
          <div className="flex ">
            <button
              className="flex gap-2 text-[15px] border-[1px] border-[#2C7BE5] bg-[#F3F8FF] px-4 py-2 rounded-sm"
              disabled={true}
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
              More Lesson
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

        {/* table */}
        <table border="1" cellPadding="8" cellSpacing="0" className="w-full">
          <thead className="bg-[#FAFAFA] border-b-[1px] border-gray-100 text-sm ">
            <tr>
              <th className="font-normal text-left pl-10 py-3 ">STT</th>
              <th className="font-normal text-left pl-10 py-3 ">Lesson Title</th>
              <th className="font-normal">Description</th>
              <th className="font-normal">Status</th>
              <th className="font-normal text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {myLessons?.total &&
              myLessons.lessons.map((lesson, index) => (
                <tr className="border-b-[1px] border-gray-100 text-sm" key={index}>
                  <td className="pl-10 py-6">{index + 1}</td>
                  <td className="pl-10 py-6">{lesson.title}</td>
                  <td className="pl-10 py-6">{lesson.description}</td>
                  <td className="text-center">
                    {lesson.completed ? (
                      <span className="px-10 py-2 bg-[#E3FEF3] text-[#16D583]">Done</span>
                    ) : (
                      <span className="px-10 py-2 bg-gray-300 text-[#16D583]">Undone</span>
                    )}
                  </td>
                  <td className="text-left">
                    <button
                      className={`px-4 py-2  rounded-sm  ${
                        lesson.completed
                          ? "bg-gray-400 text-black cursor-not-allowed opacity-30"
                          : loading && selectedLesson === lesson.id
                          ? "bg-gray-300 text-white"
                          : " bg-[#EA5656] text-white cursor-pointer"
                      }`}
                      onClick={() => {
                        setSelectedLesson(lesson.id);
                        handleMarkDoneClick(lesson.id);
                      }}
                    >
                      {loading && selectedLesson === lesson.id ? "Loading ..." : "Mark done"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
