import { Router } from "express";
import { CartManager } from "../classes/cartManager.js";

const router = Router();

const cartManager = new CartManager("./src/files/carts.json");

router.get("/:cid", async (req, res) => {
  try {
    const cartId = Number(req.params.cid);
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
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    const addProductToCartResponse = await cartManager.addProductToCart(
      cartId,
      { id: productId }
    );

    return res
      .status(200)
      .send({ status: "success", message: addProductToCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;
