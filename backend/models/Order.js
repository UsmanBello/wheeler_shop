const mongoose = require("mongoose");
const Customer = require('./Customer')

const orderSchema = mongoose.Schema({

  items:  [mongoose.Schema.Types.Mixed],
  // invoiceNo: {
  //     type: String,
  //     unique: true
  // },
  totalCost: {
      type: Number,
      required: true
  },
  confirmed: {
      type: Boolean,
      default: false
  },
  customerName:{
    type: String,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Customer',
    required: true
  },
 createdAt: {
   type: Date
 }
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;

// items: [{
//   product: {type: String, required: true},
//   price: { type: Number, required: true },
//   qty: { type: Number, required: true}
// }],