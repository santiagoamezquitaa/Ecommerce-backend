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

  putOneUserByEmail = (emailUser, newPassword) => {
    return this.dao.putUserByEmail(emailUser, newPassword);
  };

  getOneUserByEmail = (emailUser) => {
    return this.dao.getUserByEmail(emailUser);
  };

  putOneUserRole = (userId) => {
    return this.dao.putUserRole(userId);
  };

  postAllDocumentsUser = (userId, files) => {
    return this.dao.postDocumentsUser(userId, files);
  };
}
