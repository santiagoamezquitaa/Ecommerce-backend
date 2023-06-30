import { isValidPassword } from "../../utils.js";
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
      if (!email || !password) {
        throw new Error("Faltan campos a ingresar");
      }
      const userLoginValidate = await userModel.findOne(
        { email: email },
        { email: 1, firstName: 1, lastName: 1, age: 1, password: 1 }
      );
      if (!userLoginValidate) {
        throw new Error("Usuario no encontrado");
      }
      if (isValidPassword(userLoginValidate, password)) {
        throw new Error("Contraseña incorrecta");
      }
      delete userLoginValidate.password;
      return userLoginValidate;
    } catch (error) {
      throw new Error(error);
    }
  }
}
