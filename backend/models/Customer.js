const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
    type: String,
    required: true
},
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      default: null
  },
  orders: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Order'
  }],
  street: {type: String},
  city: {type: String},
  country: {type: String},
//   address:  {type: mongoose.Schema.Types.Mixed},
//   address: {
//      street: {type: String},
//      city: {type: String},
//      country: {type: String},
//      zip: {type: Number}
//   },
phone:{
      type: String
  },
 latestUpdate: {
     type: Date
 }
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;