import tokenController from "../controllers/token.controller.js";
import BaseRouter from "./router.js";

export default class TokensRouter extends BaseRouter {
  init() {
    this.post("/", ["PUBLIC"], tokenController.postNewToken);

    this.get("/:token", ["PUBLIC"], tokenController.getToken);
  }
}
