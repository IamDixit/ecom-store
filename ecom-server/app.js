/**
 * Backend Server startup file, handles incoming api's
 * @author - Abhishek Dixit <dixit2794@gmail.com>
 */
"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const healthRouter = require("./api/health/routes")();
const productRouter = require("./api/product/routes")();
const port = process.env.PORT || 4000;
/**
 * Setting Up the headers for incoming requests
 */
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/**
 * Setting Up the routers
 */
app.use("/", healthRouter);
app.use("/product", productRouter);
/**
 * Server Configuration
 */
app.listen(port, function () {
  console.log(`Server is Running on http://localhost:${port}`);
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;
  db.on("error", function (err) {
    db.close();
  });
  db.once("open", function () {
    console.log(`Connected successfully with database`);
  });
});
