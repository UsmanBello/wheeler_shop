const mongoose = require("mongoose");
// const domPurifier = require('dompurify');
// const {JSDOM} = require('jsdom');
// const htmlPurify= domPurifier(new JSDOM('').window);
// const htnlStrip = require('string-strip-html');

const productSchema = mongoose.Schema({
 productId: {
    type: String,
    required: true
  },
 name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
 snippet: {
	 type: String
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
    type: String
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

// productSchema.pre("save", async (next)=>{
// 	try{
// 		console.log('in pre validate')
// 		console.log(this)
// 	if(this.description){
// 		this.description= htmlPurify.sanitize(this.description) 
// 		this.snippet = htmlStrip(this.description.substring(0, 100)).result
		
// 	} 
//     return next() 
// 	}catch(err){
// 		console.log(err)
// 		return next(err)
// 	}
// })

const Product = mongoose.model("product", productSchema);

module.exports = Product;