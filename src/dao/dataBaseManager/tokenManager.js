import { tokensModel } from "../models/token.model.js";
import crypto from "crypto";

export class TokenManager {
  constructor() {}

  async postToken() {
    try {
      const token = crypto.randomBytes(10).toString("hex");
      const tokenAdded = await tokensModel.create({
        token: token,
        expireAt: Date.now(),
      });
      return tokenAdded;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getToken(token) {
    try {
      const tokenFound = await tokensModel.findOne({ token: token });
      if (tokenFound !== null) {
        return tokenFound;
      } else {
        throw new Error("El token no existe o ya vencio");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
