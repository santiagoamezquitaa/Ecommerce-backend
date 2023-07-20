import mockingController from "../controllers/mocking.controller.js";
import BaseRouter from "./router.js";

export default class MockingRouter extends BaseRouter {
  init() {
    this.get(
      "/mockingproducts",
      ["PUBLIC"],
      mockingController.getMockingProducts
    );
  }
}
