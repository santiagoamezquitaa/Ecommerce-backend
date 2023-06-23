import { productModel } from "../models/product.model.js";

export class ProductManager {
  notFoundMessage = "El producto no existe";

  constructor() {}

  async getProducts() {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(productId) {
    try {
      const productFound = await productModel.findById(productId);
      if (productFound !== null) {
        return productFound;
      } else {
        throw new Error(this.notFoundMessage);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(product) {
    try {
      const productAdded = await productModel.create(product);
      return ["Producto agregado correctamente", productAdded];
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(productId, fieldsUpdate) {
    try {
      const productUpdated = await productModel.updateOne(
        { _id: productId },
        fieldsUpdate
      );
      if (productUpdated.n !== 0) {
        return productUpdated;
      } else {
        throw new Error(this.notFoundMessage);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(productId) {
    try {
      const productDeleted = await productModel.deleteOne({ _id: productId });
      if (productDeleted.deletedCount !== 0) {
        return ["Producto eliminado satisfactoriamente", productId];
      } else {
        throw new Error(this.notFoundMessage);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
