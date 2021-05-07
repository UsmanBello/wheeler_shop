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
  subCategory: {
    type: String,
  },
  brand: {
    type: String
  },
  images: [{
      image: String,
      imageId: String
   }],
  sales: {
    type: Number,
    default: 0
  },
  latestUpdate: {
    type: Date
  }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;