import express from "express";
import { ProductManager } from "./classes/productManager.js";

const app = express();

const productManager = new ProductManager("./src/files/products.json");

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  const limit = Number(req.query.limit);
  if (!limit) {
    return res.send(products);
  } else {
    return res.send(products.slice(0, limit));
  }
});

app.get("/products/:pid", async (req, res) => {
  const productId = Number(req.params.pid);
  const product = await productManager.getProductById(productId);
  res.send(product);
});

app.listen(8080, () => {
  console.log("Servidor arriba en el puerto 8080!");
});
