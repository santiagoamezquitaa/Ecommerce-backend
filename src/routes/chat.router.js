import { Router } from "express";
import chatController from "../controllers/chat.controller.js";

const router = Router();

router.get("/", chatController.getMessages);

router.post("/", chatController.addMessage);

export default router;
