import express from "express";
import { ProductManager } from "../classes/productManager.js";

const router = express.Router();
const productManager = new ProductManager("./src/files/products.json");

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

export default router;
