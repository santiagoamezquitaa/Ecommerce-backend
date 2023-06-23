import { Router } from "express";
import { ProductManager } from "../dao/dataBaseManager/productManager.js";
import socketServer from "../app.js";

const router = Router();

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);
    if (!limit) {
      return res.status(200).send(products);
    } else {
      return res.status(200).send(products.slice(0, limit));
    }
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
