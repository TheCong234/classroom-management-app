import admin from "firebase-admin";
import dotenv from "dotenv";
import adminSDK from "../../adminsdk.json" assert { type: "json" };

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(adminSDK),
});

export const db = admin.firestore();
