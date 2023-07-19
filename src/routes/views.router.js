import viewsController from "../controllers/views.controller.js";
import BaseRouter from "./router.js";

export default class ViewsRouter extends BaseRouter {
  init() {
    this.get("/", ["USER", "ADMIN"], viewsController.getViewAllProducts);

    this.get(
      "/realtimeproducts",
      ["USER", "ADMIN"],
      viewsController.getViewRealtimeProducts
    );

    this.get("/chat", ["USER"], viewsController.getViewChat);

    this.get(
      "/products",
      ["USER", "ADMIN"],
      viewsController.getViewAllProductsAndProfile
    );

    this.get("/carts/:cid", ["USER", "ADMIN"], viewsController.getViewOneCart);

    this.get("/login", ["PUBLIC"], viewsController.getViewLogin);

    this.get("/register", ["PUBLIC"], viewsController.getViewRegister);

    this.get("/profile", ["USER", "ADMIN"], viewsController.getViewProfile);

    this.get("/logout", ["PUBLIC"], viewsController.getViewLogout);
  }
}
