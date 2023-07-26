import mongoose from "mongoose";

const tokensCollection = "Tokens";

const tokensSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expireAt: { type: Date, expires: 3600 },
});

export const tokensModel = mongoose.model(tokensCollection, tokensSchema);
