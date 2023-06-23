import fs from "fs";

export class ProductManager {
  fs = fs;
  notFoundMessage = "El producto no existe";
  path = "./src/files/products.json";

  constructor() {}

  async addProduct(product) {
    const products = await this.getProducts();
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.code ||
      !product.stock ||
      !product.status
    ) {
      throw new Error("Faltan campos en el producto, todos son obligatorios");
    }

    if (products.find((element) => element.code === product.code)) {
      throw new Error(
        `El código proporcionado ya existe en la lista de productos.`
      );
    }

    if (!product.thumbnails) {
      product.thumbnails = [];
    }

    const lastProductId =
      products.length > 0 ? products[products.length - 1].id : 0;
    product.status = true;
    product.id = parseInt(lastProductId) + 1;
    products.push(product);
    try {
      await this.fs.promises.writeFile(this.path, JSON.stringify(products));
      return [`Producto agregado correctamente`, product];
    } catch (error) {
      throw new Error("Error al guardar la información.");
    }
  }

  async getProducts() {
    try {
      const content = await this.fs.promises.readFile(this.path, "utf-8");
      return content ? JSON.parse(content) : [];
    } catch (error) {
      throw new Error("Error al leer el archivo que contiene los productos.");
    }
  }

  async getProductById(productId) {
    const content = await this.getProducts();
    const productFound = content.find(
      (element) => element.id === Number(productId)
    );
    if (productFound) {
      return productFound;
    } else {
      throw new Error(this.notFoundMessage);
    }
  }

  async updateProduct(productId, fieldsUpdate) {
    const products = await this.getProducts();
    const indexProductUpdate = products.findIndex(
      (element) => element.id === Number(productId)
    );

    if (indexProductUpdate === -1) {
      throw new Error(this.notFoundMessage);
    }

    if ("id" in fieldsUpdate) {
      throw new Error("El id no puede ser actualizado.");
    }

    if (
      "code" in fieldsUpdate &&
      products.some((element) => element.code === fieldsUpdate.code)
    ) {
      throw new Error("El código proporcionado ya existe");
    }

    products[indexProductUpdate] = {
      ...products[indexProductUpdate],
      ...fieldsUpdate,
    };

    await this.fs.promises.writeFile(this.path, JSON.stringify(products));
    return "Producto actualizado satisfactoriamente";
  }

  async deleteProduct(productId) {
    const products = await this.getProducts();
    const indexProductDelete = products.findIndex(
      (element) => element.id === Number(productId)
    );

    if (indexProductDelete !== -1) {
      products.splice(indexProductDelete, 1);
      await this.fs.promises.writeFile(this.path, JSON.stringify(products));
      return [`Producto eliminado satisfactoriamente`, productId];
    } else {
      throw new Error(this.notFoundMessage);
    }
  }
}
