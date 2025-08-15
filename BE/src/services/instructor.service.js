import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase.js";

const usersCol = db.collection("users");

const InstructorServices = {
  async addStudent(phone, data) {
    try {
      const existsPhone = await usersCol.doc(phone).get();
      if (existsPhone.exists) {
        throw new Error(`Phone ${phone} already exists.`);
      }
      await usersCol.doc(phone).create(data);
      return { phone, ...data };
    } catch (error) {
      console.error("Error in createUser", error);
      throw error;
    }
  },

  async assignLesson(studentPhone, data) {
    try {
      const student = await usersCol.doc(studentPhone).get();
      if (!student.exists) throw new Error("Student not found");

      const lessonId = uuidv4();
      const newLesson = {
        id: lessonId,
        ...data,
      };

      await usersCol.doc(studentPhone).update({
        lessons: [...(student.data().lessons || []), newLesson],
      });
      const updatedStudent = await usersCol.doc(studentPhone).get();
      return updatedStudent.data();
    } catch (error) {
      console.error("Error in assignLesson", error);
      throw error;
    }
  },

  async getStudents() {
    try {
      const students = await usersCol.where("role", "==", "student").get();
      const studentInfoList = students.docs.map((doc) => {
        const { lessons, ...baseInfo } = doc.data();
        return { phone: doc.id, ...baseInfo };
      });
      return studentInfoList;
    } catch (error) {
      console.error("Error in getStudents", error);
      throw error;
    }
  },

  async getStudentProfile(phone) {
    try {
      const student = await usersCol.doc(phone).get();
      if (!student.exists) throw new Error("Student not found");
      return student.data();
    } catch (error) {
      console.error("Error in getStudentProfile", error);
      throw error;
    }
  },

  async editStudent(phone, data) {
    try {
      const student = await usersCol.doc(phone).get();
      if (!student.exists) throw new Error("Student not found");

      await usersCol.doc(phone).update(data);
      const updatedStudent = await usersCol.doc(phone).get();
      return updatedStudent.data();
    } catch (error) {
      console.error("Error in editStudent", error);
      throw error;
    }
  },

  async deleteStudent(phone) {
    try {
      const student = await usersCol.doc(phone).get();
      if (!student.exists) throw new Error("Student not found");

      await usersCol.doc(phone).delete();
      return { phone };
    } catch (error) {
      console.error("Error in deleteStudent", error);
      throw error;
    }
  },
};

export default InstructorServices;
