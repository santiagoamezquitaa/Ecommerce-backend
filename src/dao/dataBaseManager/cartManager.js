import { cartModel } from "../models/cart.model.js";

export class CartManager {
  constructor() {}

  async getCarts() {
    try {
      const carts = await cartModel.find().lean();
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductsFromCart(cartId) {
    try {
      const cartFound = await cartModel.findById(cartId);
      if (cartFound !== found) {
        return cartFound.products;
      } else {
        throw new Error("El carrito no existe.");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCart() {
    try {
      const cart = {};
      cart.products = [];
      const cartAdded = await cartModel.create(cart);
      return ["Carrito agregado correctamente", cartAdded];
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cartFound = await cartModel.findOne({ _id: cartId });
      if (cartFound === null) {
        throw new Error("El carrito no existe.");
      }
      const indexProductInCart = cartFound.products.findIndex(
        (product) => product._id === productId
      );

      if (indexProductInCart === -1) {
        cartFound.products.push({ _id: productId, quantity: 1 });
      } else {
        cartFound.products[indexProductInCart].quantity += 1;
      }

      await cartFound.save();
    } catch (error) {
      throw new Error(error);
    }
  }
}
