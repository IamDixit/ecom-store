const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      rate: {
        type: Number,
      },
      count: {
        type: Number,
      },
    },
    source: {
      type: String,
      enum: ["AMAZON", "FLIPKART", "RELIANCE_DIGITAL"],
    },
  },
  { timestamps: true }
);

const product = mongoose.model("Product", ProductSchema);
module.exports = product;
