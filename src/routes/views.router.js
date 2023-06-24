import express from "express";
import { ProductManager } from "../dao/dataBaseManager/productManager.js";

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || null;
  const query = req.query.query;

  const filter = {};

  if (query) {
    filter.$or = [{ category: query }, { status: query }];
  }

  const result = await productManager.getProducts(limit, page, sort, filter);
  const products = result.docs.map((product) => product.toObject());
  res.render("home", { products, style: "index.css", title: "Home" });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await fetch("http://localhost:8080/api/products")
    .then((response) => response.json())
    .then((data) => {
      return data.payload;
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

router.get("/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const productsData = await fetch(
    `http://localhost:8080/api/products?page=${page}`
  )
    .then((response) => response.json())
    .then((data) => {
      return [data.payload, data.page, data.hasPrevPage, data.hasNextPage];
    })
    .catch((error) => {
      return error;
    });
  const products = productsData[0];
  const actualPage = productsData[1];
  const hasPrevPage = productsData[2];
  const hasNextPage = productsData[3];
  res.render("products", {
    products,
    actualPage,
    hasPrevPage,
    hasNextPage,
    style: "index.css",
    title: "Products",
  });
});

router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const carts = await fetch(`http://localhost:8080/api/carts/${cartId}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  res.render("carts", {
    carts,
    cartId,
    title: "Carts",
  });
});

export default router;
