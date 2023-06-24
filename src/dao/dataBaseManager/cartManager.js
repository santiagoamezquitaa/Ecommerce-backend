import { cartModel } from "../models/cart.model.js";

export class CartManager {
  constructor() {}

  async getCarts() {
    try {
      const carts = await cartModel.find().populate("products.product").lean();
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductsFromCart(cartId) {
    try {
      const cartFound = await cartModel
        .findById(cartId)
        .populate("products.product");
      if (cartFound !== null) {
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
        (item) => item.product._id.toString() === productId
      );

      if (indexProductInCart === -1) {
        cartFound.products.push({ product: productId, quantity: 1 });
      } else {
        cartFound.products[indexProductInCart].quantity += 1;
      }

      await cartFound.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cartFound = await cartModel.findOne({ _id: cartId });
      if (cartFound === null) {
        throw new Error("El carrito no existe.");
      }

      const indexProductInCart = cartFound.products.findIndex(
        (item) => item.product._id.toString() === productId
      );

      if (indexProductInCart !== -1) {
        if (cartFound.products[indexProductInCart].quantity > 1) {
          cartFound.products[indexProductInCart].quantity -= 1;
        } else {
          cartFound.products.splice([indexProductInCart], 1);
        }
      } else {
        throw new Error("El producto no existe.");
      }

      await cartFound.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductsFromCart(cartId, productsToUpdate) {
    try {
      const productsUpdated = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $set: { products: productsToUpdate } },
        { new: true }
      );

      if (!productsUpdated) {
        throw new Error("El carrito no existe.");
      } else {
        return productsUpdated;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantityFromProduct(cartId, productId, quantityToUpdate) {
    try {
      const cart = await cartModel.findById(cartId);

      if (!cart) {
        throw new Error("El carrito no existe.");
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product._id.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error("El producto no existe en el carrito.");
      }

      cart.products[productIndex].quantity = quantityToUpdate;

      const result = await cart.save();

      if (!result) {
        throw new Error(
          "No se pudo guardar el carrito o no se realizaron modificaciones."
        );
      } else {
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const productsDeleted = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $set: { products: [] } }
      );

      if (productsDeleted.nModified === 0) {
        throw new Error("El carrito no existe.");
      } else {
        return productsDeleted;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
