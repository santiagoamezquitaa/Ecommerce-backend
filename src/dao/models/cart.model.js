import mongoose from "mongoose";

const cartCollection = "Carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
