import mongoose from "mongoose";

const messagesCollection = "Messages";

const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const messagesModel = mongoose.model(messagesCollection, messagesSchema);
