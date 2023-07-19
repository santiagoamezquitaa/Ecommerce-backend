import productsController from "../controllers/products.controller.js";

import BaseRouter from "./router.js";

export default class ProductsRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], productsController.getProducts);

    this.get("/:pid", ["PUBLIC"], productsController.getProductById);

    this.post("/", ["ADMIN"], productsController.addProduct);

    this.put("/:pid", ["ADMIN"], productsController.updateProduct);

    this.delete("/:pid", ["ADMIN"], productsController.deleteProduct);
  }
}
