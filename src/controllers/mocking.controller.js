import { mockingService } from "../services/index.js";

const getMockingProducts = async (req, res) => {
  try {
    const productsCreated = await mockingService.getMultipleMockingProducts();
    return res.status(200).send(productsCreated);
  } catch (error) {
    return res.status(400).send({ status: "error", error: error.message });
  }
};

export default {
  getMockingProducts,
};
