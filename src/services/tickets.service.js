export default class TicketsService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllTickets = () => {
    return this.dao.getTickets();
  };

  createOneTicket = (buyerUserData) => {
    return this.dao.createTicket(buyerUserData);
  };
}
