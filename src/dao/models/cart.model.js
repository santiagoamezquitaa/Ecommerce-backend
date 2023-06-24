import mongoose from "mongoose";

const cartCollection = "Carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
