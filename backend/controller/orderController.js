const Order = require('../models/Order');

//=======/api/appointments========\\


exports.createOrder = async function(req,res){
	try{

			let order = await Order.create({
                items: req.body.items,
                totalCost: req.body.totalCost
            });
		    await order.save();
		    return res.status(200).json(order);
		
		} catch(err){
			return res.status(err.status || 500).json({
                error: {
                    message: error.message || "Oops something went wrong."
                    
                }})
			// return next({status: 400,
			// 			message: err.message})
		}

}

exports.getOrders = async function(req,res){
	try{

			let orders = await Order.find()
		    return res.status(200).json(orders);
		
		} catch(err){
			
			return res.status(err.status || 500).json({
                error: {
                    message: err.message || "Oops something went wrong."
                    
                }})
		}

}
exports.getOrder = async function(req,res){
	try{
		let order = await Order.findById(req.params.orderId)
		return res.status(200).json(order);
	}catch(err){
		return res.status(err.status || 500).json({
            error: {
                message: err.message || "Oops something went wrong."
                
            }})
	}
}
exports.updateOrder = async function(req,res){
	try{
		var order= await Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new: true})
		 return res.status(200).json(order)
	}catch(err){
		
		return res.status(err.status || 500).json({
            error: {
                message: err.message || "Oops something went wrong."
                
            }})
	}

}

exports.deleteOrder = async function(req,res){
	try{

			let foundOrder = await Order.findById(req.params.orderId) 
			await foundOrder.remove();
		    return res.status(200).json({message: 'Order deleted'});
		
		} catch(err){
			
			return res.status(err.status || 500).json({
                error: {
                    message: err.message || "Oops something went wrong."
                    
                }})
		}

}


exports.deleteManyOrders = async function(req,res){
	try{
			 await Order.deleteMany({_id: {$in: req.body.list}});
			return res.status(200).json({message: 'Orders deleted'});
		} catch(err){
			return res.status(err.status || 500).json({
                error: {
                    message: err.message || "Oops something went wrong."
                    
                }})
		}

}