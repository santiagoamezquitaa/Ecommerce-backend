export default class ProductsService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = (limit, page, sort, filter) => {
    return this.dao.getProducts(limit, page, sort, filter);
  };

  getProduct = (productId) => {
    return this.dao.getProductById(productId);
  };

  addOneProduct = (product) => {
    return this.dao.addProduct(product);
  };

  updateOneProduct = (productId, fieldsUpdate) => {
    return this.dao.updateProduct(productId, fieldsUpdate);
  };

  deleteOneProduct = (productId, loggedUserEmail, loggedUserRole) => {
    return this.dao.deleteProduct(productId, loggedUserEmail, loggedUserRole);
  };
}
