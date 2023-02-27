"use strict";
const fs = require("fs");
require("dotenv").config();
const mongoose = require("mongoose");
const ProductRepository = require("../repository/ProductRepository");

(async () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", function (err) {
    db.close();
  });
  db.once("open", async function () {
    console.log(`Connected successfully with database`);
    fs.readFile("scripts/products.json", "utf8", async function (err, data) {
      if (err) {
        console.log("Error:: ", err);
      }
      const products = JSON.parse(data);
      const productRepository = new ProductRepository();
      await productRepository.insertMany(products);
      console.log("Data is inserted Successfully!");
    });
  });
})();
