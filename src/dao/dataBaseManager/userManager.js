import { userModel } from "../models/user.model.js";

export class UserManager {
  constructor() {}

  async addUser(user) {
    try {
      const userAdded = await userModel.create(user);
      return ["Usuario agregado correctamente", userAdded];
    } catch (error) {
      throw new Error(error);
    }
  }

  async createSession(user) {
    try {
      const { email, password } = user;
      const userLoginValidate = await userModel.findOne({ email, password });
      if (!userLoginValidate) {
        throw new Error("error");
      }
      return userLoginValidate;
    } catch (error) {
      throw new Error(error);
    }
  }
}
