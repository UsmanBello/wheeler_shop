const Product = require('../models/Product');

//=======/api/appointments========\\


exports.createProduct = async function(req,res){

	try{
			let product = await Product.create({     name: req.body.name,
                                                     price: req.body.price,
													 description: req.body.description,
													 productId: req.body.productId,
                                                     countInStock: req.body.countInStock,
                                                     imageUrl: req.body.imageUrl,
                                                     category: req.body.category
                                                     });
		    await product.save();
		    return res.status(200).json(product);
		
		} catch(err){
			console.log(error)
			return res.status(err.status || 500).json({
                error: {
                    message: error.message || "Oops something went wrong."
                    
                }})
		}

}

exports.getProducts = async function(req,res){
	try{

			let products = await Product.find()
		    return res.status(200).json(products);
		
		} catch(err){
			
			return res.status(err.status || 500).json({
                error: {
                    message: err.message || "Oops something went wrong."
                    
                }})
		}

}
exports.getProduct = async function(req,res){
	try{
		let product = await Product.findById(req.params.productId)
		return res.status(200).json(product);
	}catch(err){
		return res.status(err.status || 500).json({
            error: {
                message: err.message || "Oops something went wrong."
                
            }})
	}
}
exports.updateProduct = async function(req,res){
	try{
		if(req.body.fileData){
			var product = await Product.findById(req.params.productId)
			
		   if(product.productImageId===null){
				const uploadResponse = await cloudinary.v2.uploader.upload(req.body.fileData,{upload_preset : 'ml_default'});
				product.productImage = uploadResponse.secure_url;
				product.productImageId = uploadResponse.public_id;
				await product.save();
				return res.status(200).json(product)
				
			}else{
				await cloudinary.v2.uploader.destroy(product.productImage);
				const uploadResponse = await cloudinary.v2.uploader.upload(req.body.fileData,{upload_preset : 'ml_default'});
				product.productImage = uploadResponse.secure_url;
				product.productImageId = uploadResponse.public_id; 
				await product.save();
				return res.status(200).json(product)	
			}
		
			
		}else{//THIS IS ASSUMING PRODUCT IMAGE UPLOAD HAPPENS BY ITSELF
		var product= await Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true})
		 return res.status(200).json(product)
		}
		
	}catch(err){
		
		return res.status(err.status || 500).json({
            error: {
                message: err.message || "Oops something went wrong."
                
            }})
	}

}

exports.deleteProduct = async function(req,res){
	try{

			let foundProduct = await Product.findById(req.params.productId) 
			console.log(foundProduct)
			await foundProduct.remove();
		    return res.status(200).json({_id: req.params.productId});
		
		} catch(err){
			
			return res.status(err.status || 500).json({
                error: {
                    message: err.message || "Oops something went wrong."
                    
                }})
		}

}


exports.deleteManyProducts = async function(req,res){
	try{
   console.log(req.body)
			 await Product.deleteMany({_id: {$in: req.body.list}});
			return res.status(200).json({message: 'Products deleted'});
		} catch(err){
			return res.status(err.status || 500).json({
                error: {
                    message: err.message || "Oops something went wrong."
                    
                }})
		}

}