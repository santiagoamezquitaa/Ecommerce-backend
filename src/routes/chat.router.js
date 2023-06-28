import { Router } from "express";
import { ChatManager } from "../dao/dataBaseManager/chatManager.js";

const router = Router();

const chatManager = new ChatManager();

router.get("/", async (req, res) => {
  try {
    const messages = await chatManager.getMessages();
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(200).send({ status: "error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const message = req.body;
    const messageAdded = await chatManager.addMessage(message);
    return res.status(200).send(messageAdded);
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
});

export default router;
