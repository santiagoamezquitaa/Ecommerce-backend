import supertest from "supertest";
import config from "../src/config/config.js";
import chai from "chai";

const expect = chai.expect;
const requester = supertest(`${config.baseUrl}`);

describe("Testing Ecommerce", () => {
  describe("Test de productos", () => {
    it("El endpoint /api/products con el método GET, debe obtener todos los productos. Su respuesta debe contener, las propiedades status, payload la cual será un arreglo [] y tambien debe contener propiedades de paginate", async () => {
      const { _body } = await requester.get("/api/products");

      expect(_body).to.have.property("status");
      expect(_body).to.have.property("payload");
      expect(_body.payload).to.be.an("array");
      expect(_body).to.have.property("totalPages");
      expect(_body).to.have.property("prevPage");
      expect(_body).to.have.property("nextPage");
      expect(_body).to.have.property("page");
      expect(_body).to.have.property("hasPrevPage");
      expect(_body).to.have.property("hasNextPage");
      expect(_body).to.have.property("prevLink");
      expect(_body).to.have.property("nextLink");
    });

    it("El endpoint /api/products/:pid con el método GET, debe obtener un producto con base en su Id", async () => {
      const productId = "64c03513f17ec5862ad9b311";
      const { _body } = await requester.get(`/api/products/${productId}`);
      expect(_body).to.have.property("_id");
    });

    it("El endpoint /api/products/:pid con el método GET, debe arrojar un mensaje de error al proporcionar un id no existente", async () => {
      const productId = "64c03515f17ec5862ad9b320";
      const { _body } = await requester.get(`/api/products/${productId}`);
      expect(_body.error).to.be.equals("Error: El producto no existe");
    });
  });

  describe("Test de carritos", () => {
    it("El endpoint /api/carts con el método POST, debe crear un carrito vacío", async () => {
      const { statusCode } = await requester.post("/api/carts");
      expect(statusCode).to.equal(200);
    });

    it("El endpoint /api/carts/:cid con el método PUT, debe actualizar el arreglo de productos que contiene el carrito", async () => {
      const mockListProducts = [
        {
          product: {
            _id: "6495d6ddd8cf82bb88f35e3c",
          },
          quantity: 80,
        },
      ];

      const res = await requester.get("/api/carts");
      const cartId = res.body[res.body.length - 1]._id;

      const { _body } = await requester
        .put(`/api/carts/${cartId}`)
        .send(mockListProducts);
      expect(_body.message.products[0].product).to.equal(
        "6495d6ddd8cf82bb88f35e3c"
      );
    });

    it("El endpoint /api/carts/:cid con el método DELETE, debe borrar todos los productos que contiene el carrito", async () => {
      const res = await requester.get("/api/carts");
      const cartId = res.body[res.body.length - 1]._id;

      const { statusCode } = await requester.delete(`/api/carts/${cartId}`);

      expect(statusCode).to.equal(200);
    });

    it("El endpoint /api/carts/:cid/delete con el método DELETE, debe borrar el carrito", async () => {
      const res = await requester.get("/api/carts");
      const cartId = res.body[res.body.length - 1]._id;

      const { _body } = await requester.delete(`/api/carts/${cartId}/delete`);

      expect(_body.message.deletedCount).to.equal(1);
    });
  });

  describe("Test de sessions", () => {
    it("El endpoint /api/sessions/register con el método POST, debe crear un nuevo usuario registrado", async () => {
      const newUser = {
        firstName: "Unit Test",
        lastName: "Test",
        email: "unittest@gmail.com",
        age: 100,
        password: "123",
      };

      const { _body } = await requester
        .post("/api/sessions/register")
        .send(newUser);

      expect(_body).to.be.ok;
    });

    it("El endpoint /api/sessions/register con el método POST, debe arrojar error al crear un nuevo usuario ya que faltan campos", async () => {
      const newUser = {
        firstName: "Unit Test",
        lastName: "Test",
        age: 100,
        password: "123",
      };

      const { statusCode } = await requester
        .post("/api/sessions/register")
        .send(newUser);

      expect(statusCode).to.equal(302);
    });

    it("El endpoint /api/sessions/login con el método POST, debe logear al usuario", async () => {
      const loginUser = {
        email: "unittest@gmail.com",
        password: "123",
      };

      const { _body } = await requester
        .post("/api/sessions/login")
        .send(loginUser);

      expect(_body).to.be.ok;
      expect(_body.payload).to.have.property("_id");
    });
  });
});
