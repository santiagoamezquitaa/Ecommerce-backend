import fs from "fs";

export class ProductManager {
  fs = fs;
  notFoundMessage = {
    error: "El producto no existe",
  };

  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      throw new Error("Faltan campos en el producto, todos son obligatorios");
    } else if (products.find((element) => element.code === product.code)) {
      throw new Error(
        `El código ${product.code} ya existe en la lista de productos. Intentalo con un nuevo código`
      );
    } else {
      const lastProductId =
        products.length > 0 ? products[products.length - 1].id : 0;
      product.id = parseInt(lastProductId) + 1;
      products.push(product);
      try {
        await this.fs.promises.writeFile(this.path, JSON.stringify(products));
        return `El producto llamado "${product.title}" con codigo "${product.code}" fue agregado exitosamente.`;
      } catch (error) {
        throw new Error(`Error al guardar la información ${error}`);
      }
    }
  }

  async getProducts() {
    try {
      const content = await this.fs.promises.readFile(this.path, "utf-8");
      return content ? JSON.parse(content) : [];
    } catch (error) {
      throw new Error(
        "Error al leer el archivo que contiene los productos:",
        error
      );
    }
  }

  async getProductById(productId) {
    try {
      const content = await this.getProducts();
      const productFound = content.find((element) => element.id === productId);
      if (productFound) {
        return productFound;
      } else {
        return this.notFoundMessage;
      }
    } catch (error) {
      throw new Error(
        "Error al leer el archivo que contiene los productos:",
        error
      );
    }
  }

  async updateProduct(productId, fieldsUpdate) {
    try {
      const products = await this.getProducts();
      const indexProductUpdate = products.findIndex(
        (element) => element.id === productId
      );

      if (indexProductUpdate !== -1) {
        products[indexProductUpdate] = {
          ...products[indexProductUpdate],
          ...fieldsUpdate,
        };
        await this.fs.promises.writeFile(this.path, JSON.stringify(products));
        return (
          `Producto "${productId}" ha sido actualizado satisfactoriamente`,
          products[indexProductUpdate]
        );
      } else {
        return this.notFoundMessage;
      }
    } catch (error) {
      throw new Error(
        "Error al leer el archivo que contiene los productos:",
        error
      );
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.getProducts();
      const indexProductDelete = products.findIndex(
        (element) => element.id === productId
      );

      if (indexProductDelete !== -1) {
        products.splice(indexProductDelete, 1);
        await this.fs.promises.writeFile(this.path, JSON.stringify(products));
        return `Producto "${productId}" ha sido eliminado satisfactoriamente`;
      } else {
        return this.notFoundMessage;
      }
    } catch (error) {
      throw new Error(
        "Error al leer el archivo que contiene los productos:",
        error
      );
    }
  }
}
