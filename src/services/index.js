import ProductsService from "./products.service.js";
import { ProductManager } from "../dao/dataBaseManager/productManager.js";
import CartsService from "./carts.service.js";
import { CartManager } from "../dao/dataBaseManager/cartManager.js";
import ChatService from "./chat.service.js";
import { ChatManager } from "../dao/dataBaseManager/chatManager.js";
import UsersService from "./users.service.js";
import { UserManager } from "../dao/dataBaseManager/userManager.js";

export const productsService = new ProductsService(new ProductManager());
export const cartsService = new CartsService(new CartManager());
export const chatService = new ChatService(new ChatManager());
export const userService = new UsersService(new UserManager());
