export default class CartsService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllCarts = () => {
    return this.dao.getCarts();
  };

  getAllProductsFromCart = (cartId) => {
    return this.dao.getProductsFromCart(cartId);
  };

  addOneCart = () => {
    return this.dao.addCart();
  };

  addOneProductToCart = (cartId, productId) => {
    return this.dao.addProductToCart(cartId, productId);
  };

  deleteOneProductFromCart = (cartId, productId) => {
    return this.dao.deleteProductFromCart(cartId, productId);
  };

  updateAllProductsFromCart = (cartId, productsToUpdate) => {
    return this.dao.updateProductsFromCart(cartId, productsToUpdate);
  };

  updateQuantityFromProduct = (cartId, productId, quantityToUpdate) => {
    return this.dao.updateQuantityFromProduct(
      cartId,
      productId,
      quantityToUpdate
    );
  };

  deleteAllProductsFromOneCart = (cartId) => {
    return this.dao.deleteAllProductsFromCart(cartId);
  };
}
