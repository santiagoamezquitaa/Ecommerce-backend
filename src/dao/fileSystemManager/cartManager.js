import fs from "fs";

export class CartManager {
  fs = fs;
  path = "./src/files/carts.json";

  constructor() {}

  async getCarts() {
    try {
      const content = await this.fs.promises.readFile(this.path, "utf-8");
      return content ? JSON.parse(content) : [];
    } catch (error) {
      throw new Error("Error al leer el archivo que contiene los carritos.");
    }
  }

  async getProductsFromCart(cartId) {
    const content = await this.getCarts();
    const cartFound = content.find((element) => element.id === Number(cartId));
    if (cartFound) {
      return cartFound.products;
    } else {
      throw new Error("El carrito no existe.");
    }
  }

  async addCart() {
    const carts = await this.getCarts();
    const cart = {};
    cart.products = [];
    const lastCartId = carts.length > 0 ? carts[carts.length - 1].id : 0;
    cart.id = parseInt(lastCartId) + 1;
    carts.push(cart);
    try {
      await this.fs.promises.writeFile(this.path, JSON.stringify(carts));
      return `Carrito agregado correctamente`;
    } catch (error) {
      throw new Error("Error al guardar la información.");
    }
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const indexCartToAddProduct = carts.findIndex(
      (element) => element.id === Number(cartId)
    );

    if (indexCartToAddProduct === -1) {
      throw new Error("El carrito no existe.");
    }

    const indexProductInCart = carts[indexCartToAddProduct].products.findIndex(
      (element) => element.id === Number(productId)
    );

    if (indexProductInCart !== -1) {
      carts[indexCartToAddProduct].products[indexProductInCart].quantity++;
      await this.fs.promises.writeFile(this.path, JSON.stringify(carts));
      return "Producto ya existente, se ha sumado una unidad más.";
    } else {
      const product = {
        id: Number(productId),
        quantity: 1,
      };
      carts[indexCartToAddProduct].products.push(product);
      await this.fs.promises.writeFile(this.path, JSON.stringify(carts));
      return "Producto agregado en el carrito satisfactoriamente";
    }
  }
}
