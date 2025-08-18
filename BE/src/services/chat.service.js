import { db } from "../config/firebase.js";
import { v4 as uuidv4 } from "uuid";

const ChatServices = {
  async sendMessage(sender, receiver, text) {
    const conversationId = [sender, receiver].sort().join("_");
    try {
      const messagesRef = db.collection("conversations").doc(conversationId).collection("messages");

      const messageId = uuidv4();
      const newMessage = {
        id: messageId,
        sender,
        text,
        createdAt: new Date(),
      };
      await messagesRef.doc(messageId).set(newMessage);

      const senderData = (await db.collection("users").doc(sender).get()).data();
      const receiverData = (await db.collection("users").doc(receiver).get()).data();
      const { lessons, ...senderInfo } = senderData;
      const { lessons: temp, ...receiverInfo } = receiverData;
      await db
        .collection("conversations")
        .doc(conversationId)
        .set(
          {
            participants: [sender, receiver],
            updatedAt: new Date(),
            lastMessage: newMessage,
            partnerInfo: [senderInfo, receiverInfo],
          },
          { merge: true }
        );
      return { newMessage };
    } catch (error) {
      console.error("Error in sendMessage", error);
      throw error;
    }
  },

  async getConversation(currentPhone, otherPhone) {
    const conversationId = [currentPhone, otherPhone].sort().join("_");
    try {
      const messagesRef = db
        .collection("conversations")
        .doc(conversationId)
        .collection("messages")
        .orderBy("createdAt", "asc");

      const snapshot = await messagesRef.get();
      const messages = snapshot.docs.map((doc) => doc.data());
      return { messages };
    } catch (error) {
      console.error("Error in getConversation", error);
      throw error;
    }
  },

  async getMyConversations(phone) {
    try {
      console.log(phone);

      const conversationsRef = db.collection("conversations");
      const snapshot = await conversationsRef
        .where("participants", "array-contains", phone)
        .orderBy("updatedAt", "desc")
        .get();

      const conversations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { chats: conversations };
    } catch (error) {
      console.error("Error in getConversation", error);
      throw error;
    }
  },
};

export default ChatServices;
