const ProductModel = require("../schema/Products");
const BaseRepository = require("./BaseRepository");

module.exports = class ProductRepository extends BaseRepository {
  constructor() {
    super();
  }
  model() {
    return ProductModel;
  }
};
