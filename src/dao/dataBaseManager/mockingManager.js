import { productModel } from "../models/product.model.js";
import { generateProducts } from "../../utils.js";

export class MockingManager {
  constructor() {}

  async getMockingProducts() {
    try {
      let createdProducts = [];
      for (let i = 0; i < 100; i++) {
        const newProduct = await productModel.create(generateProducts());
        createdProducts.push(newProduct);
      }

      return createdProducts;
    } catch (error) {
      throw new Error(error);
    }
  }
}
