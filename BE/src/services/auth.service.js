import jwt from "jsonwebtoken";
import { db } from "../config/firebase.js";
import { sendSms } from "../config/twilio.js";
import { convertToE164, generateAccessCode } from "../utils/helper.js";
import { jwtSecretKey } from "../environments/index.js";

const usersCol = db.collection("users");

const AuthServices = {
  async createAccessCode(phone) {
    try {
      const existsPhone = await usersCol.doc(phone).get();
      if (!existsPhone.exists) {
        throw new Error(`Phone ${phone} is not registered.`);
      }

      const code = generateAccessCode();
      const res = await db.collection("accessCodes").doc(phone).set({
        code,
        createdAt: new Date(),
      });
      // if (res) {
      //   const phoneE164 = convertToE164(phone); // Convert 09... to E.164 +849...
      //   await sendSms(phoneE164, `Access code: ${code}`);
      // }
      return { phone };
    } catch (error) {
      console.error("Error in createAccessCode:", error);
      throw error;
    }
  },

  async validateAccessCode(phone, accessCode) {
    try {
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
};

export default AuthServices;
