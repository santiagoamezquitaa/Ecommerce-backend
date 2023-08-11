import viewsController from "../controllers/views.controller.js";
import BaseRouter from "./router.js";

export default class ViewsRouter extends BaseRouter {
  init() {
    this.get(
      "/",
      ["USER", "ADMIN", "USER_PREMIUM"],
      viewsController.getViewAllProducts
    );

    this.get(
      "/realtimeproducts",
      ["USER", "ADMIN", "USER_PREMIUM"],
      viewsController.getViewRealtimeProducts
    );

    this.get("/chat", ["USER"], viewsController.getViewChat);

    this.get(
      "/products",
      ["USER", "ADMIN", "USER_PREMIUM"],
      viewsController.getViewAllProductsAndProfile
    );

    this.get(
      "/carts/:cid",
      ["USER", "ADMIN", "USER_PREMIUM"],
      viewsController.getViewOneCart
    );

    this.get("/login", ["PUBLIC"], viewsController.getViewLogin);

    this.get("/register", ["PUBLIC"], viewsController.getViewRegister);

    this.get(
      "/profile",
      ["USER", "ADMIN", "USER_PREMIUM"],
      viewsController.getViewProfile
    );

    this.get("/logout", ["PUBLIC"], viewsController.getViewLogout);

    this.get(
      "/forgotpassword",
      ["PUBLIC"],
      viewsController.getViewForgotPassword
    );

    this.get(
      "/resetpassword/:token/:email",
      ["PUBLIC"],
      viewsController.getViewResetPassword
    );

    this.get(
      "/changeuserrole",
      ["USER", "USER_PREMIUM"],
      viewsController.getViewChangeRole
    );

    this.get("/adminview", ["ADMIN"], viewsController.getViewAdmin);

    this.get(
      "/finalizepurchase",
      ["USER", "USER_PREMIUM"],
      viewsController.getFinalizePurchase
    );
  }
}
