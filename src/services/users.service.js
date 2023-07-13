export default class UsersService {
  constructor(dao) {
    this.dao = dao;
  }

  addOneUser = (user) => {
    return this.dao.addUser(user);
  };

  createOneSession = (user) => {
    return this.dao.createSession(user);
  };

  getOneUser = (userId) => {
    return this.dao.getUser(userId);
  };
}
