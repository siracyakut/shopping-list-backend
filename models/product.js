const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: false,
  },
  salePrice: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
