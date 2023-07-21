import loggerController from "../controllers/logger.controller.js";
import BaseRouter from "./router.js";

export default class LoggersRouter extends BaseRouter {
  init() {
    this.get("/loggertest", ["PUBLIC"], loggerController.getLoggerTest);
  }
}
