import { useEffect, useState } from "react";
import CreateStudentModal from "../components/CreateStudentModal.jsx";
import useInstructor from "../../../hooks/useInstructor.js";
import EditStudentModal from "../components/EditStudentModel.jsx";

export default function StudentsPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState("");
  const { loading, studentData, handleGetAllStudents, handleDeleteStudent } = useInstructor();

  const handleDeleteClick = async (phone) => {
    try {
      const result = await handleDeleteStudent({ phone });
      if (result.payload.success === false) {
        alert(result.payload.message);
        return;
      }
      alert("Deleted student");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllStudents();
  }, []);
  return (
    <div className="h-full">
      <div className="min-h-[70vh] rounded-xl border border-gray-50 shadow">
        <h2 className="font-medium text-[25px] px-10 py-6 border-b-[1px] border-gray-100 ">
          Management Students
        </h2>
        <div className="flex items-center justify-between px-10">
          <h3 className="font-medium text-[20px]  py-6 border-b-[1px] border-gray-100">
            {studentData?.total} Students
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
              Add Student
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
              <th className="font-normal text-left pl-10 py-3 ">Student Name</th>
              <th className="font-normal">Email</th>
              <th className="font-normal">Status</th>
              <th className="font-normal text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {studentData?.total &&
              studentData.students.map((student, index) => (
                <tr className="border-b-[1px] border-gray-100 text-sm" key={index}>
                  <td className="pl-10 py-6">{index + 1}</td>
                  <td className="pl-10 py-6">{student.name}</td>
                  <td className="text-center">{student.email}</td>
                  <td className="text-center">
                    {student.status ? (
                      <span className="px-10 py-2 bg-[#E3FEF3] text-[#16D583]">Active</span>
                    ) : (
                      <span className="px-10 py-2 bg-gray-300 text-[#16D583]">Inactive</span>
                    )}
                  </td>
                  <td className="text-left">
                    <div className="">
                      <button
                        className="px-4 py-2 bg-blue-600 rounded-sm text-white"
                        onClick={() => {
                          setSelectedPhone(student.phone);
                          setOpenEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={`px-4 py-2  rounded-sm text-white ml-3 ${
                          loading && selectedPhone === student.phone
                            ? "bg-gray-500"
                            : "bg-[#EA5656]"
                        }`}
                        onClick={() => {
                          setSelectedPhone(student.phone);
                          handleDeleteClick(student.phone);
                        }}
                      >
                        {loading ? "Loading ..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* create model */}
      {openCreateModal && <CreateStudentModal onClose={() => setOpenCreateModal(false)} />}

      {/* edit model1 */}
      {openEditModal && (
        <EditStudentModal onClose={() => setOpenEditModal(false)} phone={selectedPhone} />
      )}
    </div>
  );
}
