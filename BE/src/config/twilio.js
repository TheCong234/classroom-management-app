import dotenv from "dotenv";
import twilio from "twilio";
import { accountSid, authToken, phoneNumber } from "../environments/index.js";

dotenv.config();

if (!accountSid || !authToken || !phoneNumber) {
  throw new Error("Missing Twilio");
}

const client = twilio(accountSid, authToken);

export async function sendSms(to, message) {
  try {
    const result = await client.messages.create({
      body: message,
      from: phoneNumber,
      to: to,
    });
    console.log("Send sms successs: ", result.sid);
    return result;
  } catch (error) {
    console.error("Send SMS error: ", error.message);
    throw error;
  }
}
