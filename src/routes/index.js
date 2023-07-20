import { Router } from "express";
import ProductsRouter from "./products.router.js";
import ChatRouter from "./chat.router.js";
import SessionsRouter from "./sessions.router.js";
import CartsRouter from "./carts.router.js";
import ViewsRouter from "./views.router.js";
import TicketsRouter from "./tickets.router.js";
import MockingRouter from "./mocking.router.js";

const router = Router();

const viewsRouter = new ViewsRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const chatRouter = new ChatRouter();
const sessionsRouter = new SessionsRouter();
const ticketsRouter = new TicketsRouter();
const mockingRouter = new MockingRouter();

router.use("/", viewsRouter.getRouter());
router.use("/api/carts", cartsRouter.getRouter());
router.use("/api/messages", chatRouter.getRouter());
router.use("/api/sessions", sessionsRouter.getRouter());
router.use("/api/products", productsRouter.getRouter());
router.use("/api/tickets", ticketsRouter.getRouter());
router.use("/", mockingRouter.getRouter());

export default router;
