export default class ChatService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllMessages = () => {
    return this.dao.getMessages();
  };

  addOneMessage = (message) => {
    return this.dao.addMessage(message);
  };
}
