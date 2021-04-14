const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
 items: {
    type: String,
    required: true
  },
  totalCost: {
      type: Number,
      required: true
  },
  confirmed: {
      type: Boolean,
      default: false
  }
 
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;