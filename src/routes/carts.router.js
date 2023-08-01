import cartsController from "../controllers/carts.controller.js";
import BaseRouter from "./router.js";

export default class CartsRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], cartsController.getCarts);

    this.get("/:cid", ["PUBLIC"], cartsController.getProductsFromCart);

    this.post("/", ["PUBLIC"], cartsController.addCart);

    this.post(
      "/:cid/product/:pid",
      ["USER", "USER_PREMIUM"],
      cartsController.addProductToCart
    );

    this.delete(
      "/:cid/products/:pid",
      ["PUBLIC"],
      cartsController.deleteProductFromCart
    );

    this.put("/:cid", ["PUBLIC"], cartsController.updateProductsFromCart);

    this.put(
      "/:cid/products/:pid",
      ["PUBLIC"],
      cartsController.updateQuantityFromProduct
    );

    this.delete("/:cid", ["PUBLIC"], cartsController.deleteAllProductsFromCart);

    this.delete("/:cid/delete", ["PUBLIC"], cartsController.deleteCart);

    this.post("/:cid/purchase", ["PUBLIC"], cartsController.postPurchase);
  }
}
