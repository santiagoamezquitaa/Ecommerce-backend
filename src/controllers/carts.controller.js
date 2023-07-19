import { cartsService } from "../services/index.js";

const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.getAllCarts();
    return res.status(200).send(carts);
  } catch (error) {
    return res.status(200).send({ status: "error", error: error.message });
  }
};

const getProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productsFromCart = await cartsService.getAllProductsFromCart(cartId);

    return res.status(200).send(productsFromCart);
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const addCart = async (req, res) => {
  try {
    const addCartResponse = await cartsService.addOneCart();
    return res
      .status(200)
      .send({ status: "success", message: addCartResponse[1] });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const addProductToCartResponse = await cartsService.addOneProductToCart(
      cartId,
      productId
    );

    return res
      .status(200)
      .send({ status: "success", message: addProductToCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const deleteProductFromCartResponse =
      await cartsService.deleteOneProductFromCart(cartId, productId);

    return res
      .status(200)
      .send({ status: "success", message: deleteProductFromCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const updateProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body;

    const updateProductsFromCartResponse =
      await cartsService.updateAllProductsFromCart(cartId, products);

    return res
      .status(200)
      .send({ status: "success", message: updateProductsFromCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const updateQuantityFromProduct = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.newQuantity;

    const updateQuantityFromProductResponse =
      await cartsService.updateQuantityFromProduct(cartId, productId, quantity);

    return res
      .status(200)
      .send({ status: "success", message: updateQuantityFromProductResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const deleteAllProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;

    const deleteAllProductsFromCartResponse =
      await cartsService.deleteAllProductsFromOneCart(cartId);
    return res
      .status(200)
      .send({ status: "success", message: deleteAllProductsFromCartResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const postPurchase = async (req, res) => {
  try {
    const cartId = req.params.cid;

    const purchaseCartResponse = await cartsService.purchaseCart(cartId);

    req.session.user.totalPurchase = purchaseCartResponse.total;

    return res.status(200).send({
      status: "success",
      message: purchaseCartResponse,
    });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  getCarts,
  getProductsFromCart,
  addCart,
  addProductToCart,
  deleteProductFromCart,
  updateProductsFromCart,
  updateQuantityFromProduct,
  deleteAllProductsFromCart,
  postPurchase,
};
