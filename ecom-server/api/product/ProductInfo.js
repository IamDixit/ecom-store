const Joi = require("joi");
const { Types } = require("mongoose");
const ProductRepository = require("../../repository/ProductRepository");

module.exports = class ProductInfoUsecase {
  constructor(request, response, productRepository) {
    this.request = request;
    this.productRepository = productRepository;
  }
  validate(body) {
    const apiBody = Joi.object({
      id: Joi.string().required(),
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
      const { params } = this.request;
      this.validate(params);
      const data = await this.productRepository.findOne({
        _id: Types.ObjectId(params.id),
      });
      return { status: 200, message: "Data fetched successfully", data };
    } catch (err) {
      console.log("Error", err);
      return {
        status: 400,
        message: "Error while fetching product",
        error: err,
      };
    }
  }
  static create(request, response) {
    const usecase = new ProductInfoUsecase(
      request,
      response,
      new ProductRepository()
    );
    return usecase;
  }
};
