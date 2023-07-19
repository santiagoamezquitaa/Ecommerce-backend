import chatController from "../controllers/chat.controller.js";
import BaseRouter from "./router.js";

export default class ChatRouter extends BaseRouter {
  init() {
    this.get("/", ["USER"], chatController.getMessages);

    this.post("/", ["USER"], chatController.addMessage);
  }
}
