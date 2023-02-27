const Joi = require("joi");
const ProductRepository = require("../../repository/ProductRepository");

module.exports = class SearchProductsUsecase {
  constructor(request, response, productRepository) {
    this.request = request;
    this.productRepository = productRepository;
  }
  validate(body) {
    const apiBody = Joi.object({
      searchKey: Joi.string().required(),
    });
    const { error, value } = apiBody.validate(body, { allowUnknown: false });
    if (error) {
      throw error;
    } else {
      return value;
    }
  }
  async execute() {
    try {
      const { query } = this.request;
      this.validate(query);
      const searchKey = new RegExp(query.searchKey, 'i');
      const data = await this.productRepository.find({title: searchKey}, {_id: 1, title: 1, image: 1, category: 1, source: 1 });
      return { status: 200, message: "Data fetched successfully", data };
    } catch (err) {
      return {
        status: 400,
        message: "Error while searching products",
        error: err,
      };
    }
  }
  static create(request, response) {
    const usecase = new SearchProductsUsecase(
      request,
      response,
      new ProductRepository()
    );
    return usecase;
  }
};
