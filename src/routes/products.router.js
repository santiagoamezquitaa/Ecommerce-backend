import { Router } from "express";
import { ProductManager } from "../dao/dataBaseManager/productManager.js";
import socketServer from "../app.js";

const router = Router();

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null;
    const query = req.query.query;

    const filter = {};

    if (query) {
      filter.$or = [{ category: query }, { status: query }];
    }

    const products = await productManager.getProducts(
      limit,
      page,
      sort,
      filter
    );

    return res.status(200).send({
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink:
        products.prevPage === null
          ? null
          : `http://localhost:8080/api/products?page=${products.page - 1}`,
      nextLink:
        products.nextPage === null
          ? null
          : `http://localhost:8080/api/products?page=${products.page + 1}`,
    });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const addProductResponse = await productManager.addProduct(product);
    socketServer.emit("productAdded", addProductResponse[1]);
    return res
      .status(200)
      .send({ status: "success", message: addProductResponse[0] });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const productToUpdate = req.body;

    const updatedProductResponse = await productManager.updateProduct(
      productId,
      productToUpdate
    );

    return res
      .status(200)
      .send({ status: "success", message: updatedProductResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;

    const deleteProductResponse = await productManager.deleteProduct(productId);
    socketServer.emit("productDeleted", deleteProductResponse[1]);
    return res
      .status(200)
      .send({ status: "success", message: deleteProductResponse[0] });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;
