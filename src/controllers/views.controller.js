import { cartsService, ticketService } from "../services/index.js";
import { productsService } from "../services/index.js";

const getViewAllProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || null;
  const query = req.query.query;

  const filter = {};

  if (query) {
    filter.$or = [{ category: query }, { status: query }];
  }

  const result = await productsService.getAllProducts(
    limit,
    page,
    sort,
    filter
  );
  const products = result.docs.map((product) => product.toObject());
  res.render("home", { products, style: "index.css", title: "Home" });
};

const getViewRealtimeProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || null;
  const query = req.query.query;

  const filter = {};

  if (query) {
    filter.$or = [{ category: query }, { status: query }];
  }

  const result = await productsService.getAllProducts(
    limit,
    page,
    sort,
    filter
  );
  const products = result.docs.map((product) => product.toObject());

  res.render("realtimeproducts", {
    products,
    style: "index.css",
    title: "RealTImeProducts",
  });
};

const getViewChat = async (req, res) => {
  res.render("chat", {});
};

const getViewAllProductsAndProfile = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || null;
  const query = req.query.query;

  const filter = {};

  if (query) {
    filter.$or = [{ category: query }, { status: query }];
  }

  const result = await productsService.getAllProducts(
    limit,
    page,
    sort,
    filter
  );

  const products = result.docs.map((product) => product.toObject());
  const actualPage = result.page;
  const hasPrevPage = result.hasPrevPage;
  const hasNextPage = result.hasNextPage;

  res.render("products", {
    products,
    actualPage,
    hasPrevPage,
    hasNextPage,
    user: req.session.user,
    style: "index.css",
    title: "Products",
  });
};

const getViewOneCart = async (req, res) => {
  const cartId = req.params.cid;
  const carts = await cartsService.getAllProductsFromCart(cartId);

  res.render("carts", {
    carts,
    cartId,
    title: "Carts",
  });
};

const getViewLogin = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const getViewRegister = (req, res) => {
  res.render("register", {
    title: "Register",
  });
};

const getViewProfile = (req, res) => {
  res.render("profile", {
    user: req.session.user,
    title: "Profile",
  });
};

const getViewLogout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.json({ status: "Logout Error", body: err });
    }
    res.redirect("/login");
  });
};

const getViewForgotPassword = (req, res) => {
  res.render("forgotPassword", {
    title: "Forgot Password",
  });
};

const getViewResetPassword = (req, res) => {
  const token = req.params.token;
  const email = req.params.email;
  res.render("resetPassword", {
    token,
    email,
    title: "reset Password",
  });
};

export default {
  getViewAllProducts,
  getViewRealtimeProducts,
  getViewChat,
  getViewAllProductsAndProfile,
  getViewOneCart,
  getViewLogin,
  getViewRegister,
  getViewProfile,
  getViewLogout,
  getViewForgotPassword,
  getViewResetPassword,
};
