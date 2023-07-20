import ProductsService from "./products.service.js";
import { ProductManager } from "../dao/dataBaseManager/productManager.js";
import CartsService from "./carts.service.js";
import { CartManager } from "../dao/dataBaseManager/cartManager.js";
import ChatService from "./chat.service.js";
import { ChatManager } from "../dao/dataBaseManager/chatManager.js";
import UsersService from "./users.service.js";
import { UserManager } from "../dao/dataBaseManager/userManager.js";
import TicketsService from "./tickets.service.js";
import { TicketManager } from "../dao/dataBaseManager/ticketManager.js";
import MockingService from "./mockig.service.js";
import { MockingManager } from "../dao/dataBaseManager/mockingManager.js";

export const productsService = new ProductsService(new ProductManager());
export const cartsService = new CartsService(new CartManager());
export const chatService = new ChatService(new ChatManager());
export const userService = new UsersService(new UserManager());
export const ticketService = new TicketsService(new TicketManager());
export const mockingService = new MockingService(new MockingManager());
