import { ticketService } from "../services/index.js";

const getTicket = async (req, res) => {
  try {
    const prueba = await ticketService.getAllTickets();
    return res.status(200).send(prueba);
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const createTicket = async (req, res) => {
  try {
    const amount = req.session.user.totalPurchase;

    const purchaser = req.session.user.email;
    const buyerUserData = {
      amount,
      purchaser,
    };
    const ticketCreated = await ticketService.createOneTicket(buyerUserData);
    return res.status(200).send({ status: "success", message: ticketCreated });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

export default {
  getTicket,
  createTicket,
};
