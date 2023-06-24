import { Router } from "express";
import { CartManager } from "../dao/dataBaseManager/cartManager.js";

const router = Router();

const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    return res.status(200).send(carts);
  } catch (error) {
    return res.status(200).send({ status: "error", error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productsFromCart = await cartManager.getProductsFromCart(cartId);
    return res.status(200).send(productsFromCart);
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const addCartResponse = await cartManager.addCart();
    return res
      .status(200)
      .send({ status: "success", message: addCartResponse });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const addProductToCartResponse = await cartManager.addProductToCart(
      cartId,
      productId
    );

    return res
      .status(200)
      .send({ status: "success", message: addProductToCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const deleteProductFromCartResponse =
      await cartManager.deleteProductFromCart(cartId, productId);

    return res
      .status(200)
      .send({ status: "success", message: deleteProductFromCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body;

    const updateProductsFromCartResponse =
      await cartManager.updateProductsFromCart(cartId, products);

    return res
      .status(200)
      .send({ status: "success", message: updateProductsFromCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.newQuantity;

    const updateQuantityFromProductResponse =
      await cartManager.updateQuantityFromProduct(cartId, productId, quantity);

    return res
      .status(200)
      .send({ status: "success", message: updateQuantityFromProductResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    const deleteAllProductsFromCartResponse =
      await cartManager.deleteAllProductsFromCart(cartId);
    return res
      .status(200)
      .send({ status: "success", message: deleteAllProductsFromCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;
