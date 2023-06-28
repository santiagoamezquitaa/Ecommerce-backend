import mongoose from "mongoose";

const usersCollection = "Users";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  password: String,
});

export const userModel = mongoose.model(usersCollection, userSchema);
