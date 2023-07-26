export default class TokenService {
  constructor(dao) {
    this.dao = dao;
  }

  postOneToken = () => {
    return this.dao.postToken();
  };

  getOneToken = (token) => {
    return this.dao.getToken(token);
  };
}
