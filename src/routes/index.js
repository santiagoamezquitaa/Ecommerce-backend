import { Router } from "express";
import productsRoutes from "./products.router.js";
import cartsRoutes from "./carts.router.js";
import viewsRoutes from "./views.router.js";
import messagesRoutes from "./chat.router.js";
import sessionsRoutes from "./sessions.router.js";

const router = Router();

router.use("/api/products", productsRoutes);
router.use("/api/carts", cartsRoutes);
router.use("/api/messages", messagesRoutes);
router.use("/api/sessions", sessionsRoutes);
router.use("/", viewsRoutes);

export default router;
