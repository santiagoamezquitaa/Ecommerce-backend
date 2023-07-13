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
};

const getViewChat = async (req, res) => {
  res.render("chat", {});
};

const getViewAllProductsAndProfile = async (req, res) => {
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
    user: req.session.user,
    style: "index.css",
    title: "Products",
  });
};

const getViewOneCart = async (req, res) => {
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
};
