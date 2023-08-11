import { productModel } from "../models/product.model.js";

export class ProductManager {
  notFoundMessage = "El producto no existe";

  constructor() {}

  async getProducts(limit, page, sort, filter) {
    try {
      if (sort === null) {
        const options = {
          limit: limit,
          page: page,
          sort: { sort },
        };
        return await productModel.paginate(filter, options);
      } else if (sort === "desc") {
        const options = {
          limit: limit,
          page: page,
          sort: { price: -1 },
        };
        return await productModel.paginate(filter, options);
      } else if (sort === "asc") {
        const options = {
          limit: limit,
          page: page,
          sort: { price: 1 },
        };
        return await productModel.paginate(filter, options);
      } else {
        throw new Error("Opción de ordenamiento no compatible.");
      }
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

  async deleteProduct(productId, loggedUserEmail, loggedUserRole) {
    try {
      const product = await productModel.findById(productId);

      if (!product) {
        throw new Error(this.notFoundMessage);
      }

      if (
        product.owner === loggedUserEmail ||
        loggedUserRole.toUpperCase() === "ADMIN"
      ) {
        const productDeleted = await productModel.deleteOne({ _id: productId });
        if (productDeleted.deletedCount !== 0) {
          return [
            "Producto eliminado satisfactoriamente",
            productId,
            product.owner,
          ];
        } else {
          throw new Error(this.notFoundMessage);
        }
      } else {
        throw new Error("No tienes permiso para eliminar este producto");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
