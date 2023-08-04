import mongoose from "mongoose";

const usersCollection = "Users";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    default: "User",
  },
  documents: {
    type: [
      {
        name: {
          type: String,
        },
        reference: {
          type: String,
        },
      },
    ],
    default: [],
  },
  statusDocuments: {
    type: Boolean,
    default: false,
  },
  lastConnection: {
    type: Date,
    default: null,
  },
});

export const userModel = mongoose.model(usersCollection, userSchema);
