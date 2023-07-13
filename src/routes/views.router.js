import express from "express";
import viewsController from "../controllers/views.controller.js";

const router = express.Router();

router.get("/", auth, viewsController.getViewAllProducts);

router.get("/realtimeproducts", auth, viewsController.getViewRealtimeProducts);

router.get("/chat", auth, viewsController.getViewChat);

router.get("/products", auth, viewsController.getViewAllProductsAndProfile);

router.get("/carts/:cid", auth, viewsController.getViewOneCart);

router.get("/login", viewsController.getViewLogin);

router.get("/register", viewsController.getViewRegister);

router.get("/profile", auth, viewsController.getViewProfile);

router.get("/logout", viewsController.getViewLogout);

function auth(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).redirect("/login");
}

export default router;
