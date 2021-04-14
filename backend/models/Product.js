const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
 productId: {
    type: String,
    // required: true
  },
 name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;