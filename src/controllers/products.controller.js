import socketServer from "../app.js";
import { productsService } from "../services/index.js";
import CustomError from "../utils.errors/custom.errors.js";
import enumErrors from "../utils.errors/enum.errors.js";
import generateProductErrorInfo from "../utils.errors/info.errors.js";

const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null;
    const query = req.query.query;

    const filter = {};

    if (query) {
      filter.$or = [{ category: query }, { status: query }];
    }

    const products = await productsService.getAllProducts(
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
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productsService.getProduct(productId);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      code,
      stock,
      status,
      thumbnails,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !code ||
      !stock ||
      !status
    ) {
      CustomError.createError({
        name: "Creación de producto fallida",
        cause: generateProductErrorInfo({
          title,
          description,
          price,
          category,
          code,
          stock,
          status,
          thumbnails,
        }),
        message: "Error creando el producto",
        code: enumErrors.INVALID_TYPES_ERROR,
      });
    }

    const product = {
      title,
      description,
      price,
      category,
      code,
      stock,
      status,
      thumbnails,
    };

    const addProductResponse = await productsService.addOneProduct(product);
    socketServer.emit("productAdded", addProductResponse[1]);
    return res
      .status(200)
      .send({ status: "success", message: addProductResponse[0] });
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const productToUpdate = req.body;

    const updatedProductResponse = await productsService.updateOneProduct(
      productId,
      productToUpdate
    );

    return res
      .status(200)
      .send({ status: "success", message: updatedProductResponse });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pid;

    const deleteProductResponse = await productsService.deleteOneProduct(
      productId
    );
    socketServer.emit("productDeleted", deleteProductResponse[1]);
    return res
      .status(200)
      .send({ status: "success", message: deleteProductResponse[0] });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
