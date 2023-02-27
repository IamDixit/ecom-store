"use strict";
const express = require("express");
const ProductInfo = require('./ProductInfo');
const SearchProducts = require('./SearchProducts');

const routes = function () {
  const productRouter = express.Router();
  productRouter.route("/search").get(async function (req, res) {
    const usecase = SearchProducts.create(req, res);
    const response = await usecase.execute(req, res);
    res.status(response.status).json(response);
  });
  productRouter.route("/info/:id").get(async function (req, res) {
    const usecase = ProductInfo.create(req, res);
    const response = await usecase.execute(req, res);
    res.status(response.status).json(response);
  });
  return productRouter;
};

module.exports = routes;
