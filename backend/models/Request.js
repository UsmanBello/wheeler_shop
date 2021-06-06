const mongoose = require("mongoose");
const Product = require('./Product')

const requestSchema = mongoose.Schema({

 fullName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  phone: {
      type: Number,
      required: true
  },
//   productName:{
//     type:String,
//     required: true 
//   },
  product:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: true
 },
 createdAt: {
   type: Date
 }
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;