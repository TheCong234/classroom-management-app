import { db } from "../config/firebase.js";
import { jwtSecretKey } from "../environments/index.js";
import { sendAccessCodeToEmail } from "../utils/emailHelper.js";
import { generateAccessCode } from "../utils/helper.js";
import jwt from "jsonwebtoken";

const usersCol = db.collection("users");

const StudentServices = {
  async signinEmail(email) {
    try {
      const studentSnapshot = await usersCol.where("email", "==", email).limit(1).get();
      if (studentSnapshot.empty) {
        throw new Error("Email not found.");
      }

      const phone = studentSnapshot.docs[0].id;
      const code = generateAccessCode();
      console.log("dddddddddddd: ", phone);

      const res = await db.collection("accessCodes").doc(phone).set({
        code,
        createdAt: new Date(),
      });
      if (res) {
        const result = await sendAccessCodeToEmail(email, "Access code", code);
        return { sendEmail: result };
      }

      return null;
    } catch (error) {
      console.error("Error in signinEmail", error);
      throw error;
    }
  },

  async validateAccessCodeWidthEmail(email, accessCode) {
    try {
      const studentSnapshot = await usersCol.where("email", "==", email).limit(1).get();
      if (studentSnapshot.empty) {
        throw new Error("Email not found.");
      }
      const phone = studentSnapshot.docs[0].id;

      const accessCodeSnap = await db.collection("accessCodes").doc(phone).get();
      if (!accessCodeSnap.exists || accessCodeSnap.data().code !== accessCode) {
        throw new Error("Code is invalid");
      }
      await db.collection("accessCodes").doc(phone).delete();
      const user = await db.collection("users").doc(phone).get();
      const role = user.exists ? user.data().role : null;

      const token = jwt.sign({ phone: phone, role: role }, jwtSecretKey, {
        expiresIn: "5d",
      });
      return { phone, role, token };
    } catch (error) {
      console.error("Error in validateAccessCode:", error);
      throw error;
    }
  },

  async getMyLessons(phone) {
    try {
      const studentSnapshot = await usersCol.doc(phone).get();
      const student = studentSnapshot.data();
      return student?.lessons;
    } catch (error) {
      console.error("Error in getMyLessons", error);
      throw error;
    }
  },

  async markLessonDone(phone, lessonId) {
    try {
      const studentSnapshot = await usersCol.doc(phone).get();
      const lessonList = studentSnapshot.data().lessons;

      const updatedLessonList = lessonList.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      );
      await usersCol.doc(phone).update({ lessons: updatedLessonList });
      const updatedLessons = (await usersCol.doc(phone).get()).data().lessons;
      return updatedLessons.find((lesson) => lesson.id === lessonId) || null;
    } catch (error) {
      console.error("Error in markLessonDone", error);
      throw error;
    }
  },

  async editProfile(phone, data) {
    try {
      await usersCol.doc(phone).update(data);
      const updatedProfile = await usersCol.doc(phone).get();
      return updatedProfile.data();
    } catch (error) {
      console.error("Error in editProfile", error);
      throw error;
    }
  },
};

export default StudentServices;
