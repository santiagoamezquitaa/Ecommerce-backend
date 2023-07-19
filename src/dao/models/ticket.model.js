import mongoose from "mongoose";

const ticketsCollection = "Tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchaseDatetime: Date,
  amount: Number,
  purchaser: String,
});

export const ticketModel = mongoose.model(ticketsCollection, ticketSchema);
