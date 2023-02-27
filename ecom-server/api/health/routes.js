"use strict";
const express = require("express");

const routes = function () {
  const healthRouter = express.Router();
  healthRouter.route("/health").get(function (req, res) {
    res.json({ status: 200, message: "Server is running smoothly" });
  });
  return healthRouter;
};

module.exports = routes;
