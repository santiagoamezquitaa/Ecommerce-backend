import productsController from "../controllers/products.controller.js";

import BaseRouter from "./router.js";

export default class ProductsRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], productsController.getProducts);

    this.get("/:pid", ["PUBLIC"], productsController.getProductById);

    this.post("/", ["ADMIN", "USER_PREMIUM"], productsController.addProduct);

    this.put(
      "/:pid",
      ["ADMIN", "USER_PREMIUM"],
      productsController.updateProduct
    );

    this.delete(
      "/:pid",
      ["ADMIN", "USER_PREMIUM"],
      productsController.deleteProduct
    );
  }
}
