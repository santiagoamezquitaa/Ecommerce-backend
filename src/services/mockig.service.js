export default class MockingService {
  constructor(dao) {
    this.dao = dao;
  }

  getMultipleMockingProducts = () => {
    return this.dao.getMockingProducts();
  };
}
