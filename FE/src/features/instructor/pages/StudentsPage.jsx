import { useState } from "react";
import CreateStudentModal from "../components/CreateStudentModal.jsx";

export default function StudentsPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <div className="h-full">
      <div className="min-h-[70vh] rounded-xl border border-gray-50 shadow">
        <h2 className="font-medium text-[25px] px-10 py-6 border-b-[1px] border-gray-100 ">
          Management Students
        </h2>
        <div className="flex items-center justify-between px-10">
          <h3 className="font-medium text-[20px]  py-6 border-b-[1px] border-gray-100">
            4 Students
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
              <th className="font-normal text-left pl-10 py-3 ">Student Name</th>
              <th className="font-normal">Email</th>
              <th className="font-normal">Status</th>
              <th className="font-normal text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b-[1px] border-gray-100 text-sm">
              <td className="pl-10 py-6">Hàng 1 - Cột 1</td>
              <td className="text-center">Hàng 1 - Cột 2</td>
              <td className="text-center">
                <span className="px-10 py-2 bg-[#E3FEF3] text-[#16D583]">Active</span>
              </td>
              <td className="text-left">
                <div className="">
                  <button className="px-4 py-2 bg-blue-600 rounded-sm text-white">Edit</button>
                  <button className="px-4 py-2 bg-[#EA5656] rounded-sm text-white ml-3">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="pl-10 py-6">Hàng 2 - Cột 1</td>
              <td>Hàng 2 - Cột 2</td>
              <td>Hàng 2 - Cột 3</td>
              <td>Hàng 2 - Cột 4</td>
            </tr>
            <tr className="border-b-[1px] border-gray-100 text-sm">
              <td className="pl-10 py-6">Hàng 3 - Cột 1</td>
              <td>Hàng 3 - Cột 2</td>
              <td>Hàng 3 - Cột 3</td>
              <td>Hàng 3 - Cột 4</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* create model */}
      {openCreateModal && <CreateStudentModal onClose={() => setOpenCreateModal(false)} />}
    </div>
  );
}
