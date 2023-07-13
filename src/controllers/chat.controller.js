import { chatService } from "../services/index.js";

const getMessages = async (req, res) => {
  try {
    const messages = await chatService.getAllMessages();
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(200).send({ status: "error", error: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const message = req.body;
    const messageAdded = await chatService.addOneMessage(message);
    return res.status(200).send(messageAdded);
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

export default {
  getMessages,
  addMessage,
};
