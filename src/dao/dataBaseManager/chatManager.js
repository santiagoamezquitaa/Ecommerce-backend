import { messagesModel } from "../models/chat.model.js";

export class ChatManager {
  constructor() {}

  async getMessages() {
    try {
      const messages = await messagesModel.find().lean();
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addMessage(message) {
    try {
      const messageAdded = await messagesModel.create(message);
      return messageAdded;
    } catch (error) {
      throw new Error(error);
    }
  }
}
