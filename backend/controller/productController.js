const Product = require('../models/Product');
var cloudinary =  require('../config/cloudinary')
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify= domPurifier(new JSDOM('').window);
const { stripHtml } = require('string-strip-html');

//=======/api/appointments========\\

exports.createProduct = async function(req,res){

	try{
		if(req.body.name===''){
			return res.status(400).json({ message: "Name is required."})
		}
		if(req.body.price===''){
			return res.status(400).json({ message: "Price is required."})
		}
		if(req.body.productId===''){
			return res.status(400).json({ message: "ProductId is required."})
		}
		if(req.body.countInStock===''){
			return res.status(400).json({ message: "Available quantity is required."})
		}

		if(req.body.images){
		       const imagesUrls=[]
			   for(const image of req.body.images){
				const uploadResponse = await cloudinary.v2.uploader.upload(image,{upload_preset : 'ml_default'});
				imagesUrls.push({image: uploadResponse.secure_url, imageId: uploadResponse.public_id})
			   }
			
			// if(some required body data is missing return respective error and status)
			let sanitizedDescription= htmlPurify.sanitize(req.body.description) 
			let snippet= stripHtml(sanitizedDescription.substring(0, 100)).result
			
			let product = await Product.create({     name: req.body.name,
                                                     price: req.body.price,
													 description: sanitizedDescription,
												     snippet: snippet,
													 productId: req.body.productId,
													 brand: req.body.brand,
                                                     countInStock: req.body.countInStock,
                                                     images: imagesUrls,
                                                     category: req.body.category,
													 subCategory: req.body.subCategory,
													 latestUpdate: new Date()
                                                     });

													 console.log(product)
		    await product.save();
		    return res.status(200).json(product);
			}
			//else return invalid input/forbidden images rewuired 
		
		} catch(err){
			console.log(err)
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}
exports.getProductsCount = async function(req,res){
	
	try{
            // console.log(req.query.searchTerm)
			  var count= await Product.find().countDocuments()
			//   console.log(count)
				return res.status(200).json({totalproducts: count});
				
		} catch(err){
			
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}
	
}
exports.getProducts = async function(req,res){
	
	try{
		const qParams=req.query
		// if(qParams.searchTerm === 'undefined' && qParams.brand=== 'undefined' && qParams.category=== 'undefined' && qParams.subCategory === 'undefined'){
		// 			let products = await Product.find({})
		// 			let count= await Product.find({}).countDocuments()
		// 			return res.status(200).json({products, count});
		// }    
				const page= +qParams.page || 1; //the plus sign converts it to number
				const limit= +qParams.productsPerPage || 15;
				const skipValue= (page-1)* qParams.productsPerPage;
				const regex = new RegExp(escapeRegex(qParams.searchTerm), 'gi');
				var query={}
				var sort={}
				if(qParams.sort){
				  if(qParams.sort==='latest'){
					  sort.latestUpdate = -1
				  }else if(qParams.sort==='ascending'){
					 sort.price = 1
				  }else if(qParams.sort==='descending'){
					sort.price = -1
				  }else if(qParams.sort==='sales'){
					sort.sales = -1
				  }

				}
				if(qParams.searchTerm){
					qParams.searchTerm ? query.name=regex : null
				}
				if(qParams.brand){
					qParams.brand ? query.brand = qParams.brand : null
				}
				if(qParams.category){
					qParams.category ? query.category = qParams.category : null
				}
				if(qParams.subCategory){
					qParams.subCategory ? query.subCategory = qParams.subCategory : null
				}
				let products= await Product.find({...query}).sort({...sort}).skip(skipValue).limit(Number(qParams.productsPerPage))
				let count = await Product.find({...query}).countDocuments()
				// let products = await Product.find({$or: [{name: regex},{brand: qParams.brand},{subCategory: qParams.subCategory}]}).skip(skipValue).limit(Number(qParams.productsPerPage))
				// let count = await Product.find({$or: [{name: regex},{brand: qParams.brand},{subCategory: qParams.subCategory}]}).countDocuments()
				// console.log(products)
			
				return res.status(200).json({products, count});
		
		} catch(err){
			console.log(err.message)
			return res.status(err.status || 500).json({ message: err.message || "Oops something went wrong."})
		}
	
}
exports.getAllBrands =  async function(req, res){
	try{
			let brands = await Product.distinct('brand')
			return res.status(200).json(brands)
			
	}catch(err){
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}
}
exports.getProduct = async function(req,res){
	try{
		let product = await Product.findById(req.params.productId)
		return res.status(200).json(product);
	}catch(err){
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}
}

exports.getRelatedProducts = async function(req, res){
	try {
		let product= await Product.findById(req.params.productId)
		let subCat= product.subCategory;
		let cat= product.category;
		  let productsBySubCategory= await Product.find({subCategory: subCat}).limit(10)
		  let productsByCategory= await Product.find({category: cat}).limit(10)
		  
		  let relatedBySubCategory= productsBySubCategory.filter(prod=>prod._id.toString()!==req.params.productId.toString())
		  let relatedByCategory= productsByCategory.filter(prod=>prod._id.toString()!==req.params.productId.toString())
		  let relatedProducts=[...shuffle(relatedBySubCategory), ...shuffle(relatedByCategory)]
		  let distinctRelatedProducts= relatedProducts.filter((relatedProduct, i, self)=>self.findIndex(t=>																							(t._id.toString()===relatedProduct._id.toString()))===i)
		
		 return res.status(200).json(distinctRelatedProducts.slice(0,3))

	}catch(err){
		console.log(err)
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}
}
exports.updateProduct = async function(req,res){
	try{
		if(req.body.name===''){
			return res.status(400).json({ message: "Name is required."})
		}
		if(req.body.price===''){
			return res.status(400).json({ message: "Price is required."})
		}
		if(req.body.productId===''){
			return res.status(400).json({ message: "ProductId is required."})
		}
		if(req.body.countInStock===''){
			return res.status(400).json({ message: "Available quantity is required."})
		}
		  let sanitizedDescription
		  let descriptionSnippet
		if(req.body.images){
			var product = await Product.findById(req.params.productId)
			
		   if(product.images.length===0){
			var imagesUrls=[]
			for(const image of req.body.images){
			 const uploadResponse = await cloudinary.v2.uploader.upload(image,{upload_preset : 'ml_default'});
			 imagesUrls.push({image: uploadResponse.secure_url, imageId: uploadResponse.public_id})
			}
			  //ALSO CHECK IF ANY PART IS MISSING AND RETURN APPROPRIATE ERROR AND STATUS CODE
			sanitizedDescription= htmlPurify.sanitize(req.body.description) 
			descriptionSnippet= stripHtml(sanitizedDescription.substring(0, 100)).result
			 var product= await Product.findOneAndUpdate({_id: req.params.productId}, {...req.body,
																					    description: sanitizedDescription,
																					    snippet: descriptionSnippet,
																					   	images: imagesUrls,
																						latestUpdate: new Date()},
														 								{new: true})
		    return res.status(200).json(product)
				
			}else{
				var imagesUrls=[]
				for(const image of product.images){
					await cloudinary.v2.uploader.destroy(image);
				}
				for(const image of req.body.images){
					const uploadResponse = await cloudinary.v2.uploader.upload(image,{upload_preset : 'ml_default'});
					imagesUrls.push({image: uploadResponse.secure_url, imageId: uploadResponse.public_id})
				}
				
				sanitizedDescription = htmlPurify.sanitize(req.body.description) 
			    descriptionSnippet = stripHtml(sanitizedDescription.substring(0, 100)).result
				
				var product= await Product.findOneAndUpdate({_id: req.params.productId}, {...req.body,
																						   description: sanitizedDescription,
																					       snippet: descriptionSnippet,
																						   images: imagesUrls,
																						   latestUpdate: new Date()},
															                              {new: true})
		    return res.status(200).json(product)	
			}
		
			
		}else{//THIS IS ASSUMING PRODUCT IMAGE UPLOAD HAPPENS BY ITSELF
		sanitizedDescription = htmlPurify.sanitize(req.body.description) 
			    descriptionSnippet = stripHtml(sanitizedDescription.substring(0, 100)).result
		var product= await Product.findOneAndUpdate({_id: req.params.productId}, {...req.body, 
																				  description: sanitizedDescription,
																				  snippet: descriptionSnippet+'...',
																				  latestUpdate: new Date()},
																				  {new: true})
		 return res.status(200).json(product)
		}
		
	}catch(err){
		console.log(err)
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}

}

exports.deleteProduct = async function(req,res){
	try{

			let foundProduct = await Product.findById(req.params.productId) 
			if(foundProduct.images){
			for( const image of foundProduct.images){
				await cloudinary.v2.uploader.destroy(image.imageId);
			}
		    }
			console.log(foundProduct)
			await foundProduct.remove();
		    return res.status(200).json({_id: req.params.productId});
		
		} catch(err){
			 console.log(err)
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}


exports.deleteManyProducts = async function(req,res){
// 	try{
//    console.log(req.body)
// 			 await Product.deleteMany({_id: {$in: req.body.list}});
// 			return res.status(200).json({message: 'Products deleted'});
// 		} catch(err){
// 			return res.status(err.status || 500).json({
//                 error: {
//                     message: err.message || "Oops something went wrong."
//                 }})
// 		}

}
/// ======FOR FUZZY SEARCH===== \\\
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
			  
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}