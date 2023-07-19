import { ticketModel } from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";

import { ProductManager } from "./productManager.js";

const productManager = new ProductManager();

export class TicketManager {
  constructor() {}

  async getTickets() {
    try {
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTicket(buyerUserData) {
    try {
      const now = new Date();
      const options = { timeZone: "America/Bogota" };
      now.toLocaleString("en-US", options);

      const code = uuidv4();
      const purchaseDatetime = now;

      buyerUserData.code = code;
      buyerUserData.purchaseDatetime = purchaseDatetime;

      const ticketAdded = await ticketModel.create(buyerUserData);

      return ticketAdded;
    } catch (error) {
      throw new Error(error);
    }
  }
}
