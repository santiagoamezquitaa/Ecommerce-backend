import ticketsController from "../controllers/tickets.controller.js";
import BaseRouter from "./router.js";

export default class TicketsRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], ticketsController.getTicket);

    this.post("/", ["PUBLIC"], ticketsController.createTicket);
  }
}
