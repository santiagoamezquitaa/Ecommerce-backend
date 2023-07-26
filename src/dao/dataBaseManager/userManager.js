import { createhash, isValidPassword } from "../../utils.js";
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

  async getUser(userId) {
    try {
      if (!userId) {
        throw new Error("Falta el id del usuario");
      }
      const userFound = await userModel
        .findById(userId)
        .populate("cart")
        .lean();
      if (userFound !== null) {
        return userFound;
      } else {
        throw new Error("No se encontro el usuario");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async putUserByEmail(emailUser, newPassword) {
    try {
      const userFounded = await userModel.findOne({ email: emailUser });
      if (userFounded === null) {
        throw new Error("El correo no existe");
      }

      const password = newPassword.password;

      if (isValidPassword(userFounded, newPassword.password)) {
        throw new Error("No se puede establecer la misma contraseña anterior");
      }

      const emailUpdated = await userModel.updateOne(
        { email: emailUser },
        { password: createhash(password) }
      );

      if (emailUpdated.n !== 0) {
        return emailUpdated;
      } else {
        throw new Error("Ocurrio un problema al actualizar la contraseña");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByEmail(emailUser) {
    try {
      const userFounded = await userModel.findOne({ email: emailUser });
      if (userFounded === null) {
        throw new Error("El correo no existe");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async putUserRole(userId) {
    try {
      const userFound = await userModel.findById(userId);
      if (userFound === null) {
        throw new Error("El usuario no existe");
      }
      const userRole = userFound.role;
      let newRole = "";
      if (userRole.toUpperCase() === "USER") {
        newRole = "User_premium";
      } else if (userRole.toUpperCase() === "USER_PREMIUM") {
        newRole = "User";
      } else {
        throw new Error(
          "El rol del usuario proporcionado no puede ser cambiado (solo: User y User_premium)"
        );
      }

      const userRoleUpdated = await userModel.updateOne(
        { _id: userId },
        { role: newRole }
      );

      console.log(userRoleUpdated);

      if (userRoleUpdated.n !== 0) {
        return userRoleUpdated;
      } else {
        throw new Error("Ocurrio un problema al actualizar la contrraseña");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
