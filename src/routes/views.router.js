import express from "express";
import { ProductManager } from "../dao/dataBaseManager/productManager.js";

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products, style: "index.css", title: "Home" });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await fetch("http://localhost:8080/api/products")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.render("realtimeproducts", {
    products,
    style: "index.css",
    title: "RealTImeProducts",
  });
});

router.get("/chat", async (req, res) => {
  res.render("chat", {});
});

export default router;
