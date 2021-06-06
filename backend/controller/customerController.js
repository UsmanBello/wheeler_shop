const Customer= require('../models/Customer');
const Order = require('../models/Order');
exports.getCustomersCount = async function(req,res){
	
	try{
			    var count= await Customer.find().countDocuments()
				return res.status(200).json({totalcustomers: count});
				
		} catch(err){
			
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}
	
}
exports.getCustomers = async function(req,res){
	try{
		
		const qParams=req.query
		const page= +qParams.page || 1;
		const skipValue= (page-1)* qParams.customersPerPage;
		// var regex 
		var query={}
		// var sort= qParams.sort === 'alphabetical' ? {fullName: 1} : {lastUpdated: -1}
		
		if(qParams.searchTerm){
			// regex= new RegExp(escapeRegex(qParams.searchTerm), 'gi');
			 query.firstName=qParams.searchTerm 
			//  query.lastName = qParams.searchTerm
			//  query.email= qParams.searchTerm
		}
		let customers= await Customer.find({...query}).sort({lastUpdated: -1}).skip(skipValue).limit(Number(qParams.customersPerPage))
		let count = await Customer.find({...query}).countDocuments()
		
		return res.status(200).json({customers, count});

		} catch(err){
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}
exports.getCustomer = async function(req,res){
	try{
		
		let customer = await Customer.findById(req.params.customerId)
		
		return res.status(200).json(customer);
	}catch(err){
		console.log(err)
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}
}
exports.updateCustomer = async function(req,res){
	try{
		var customer= await Customer.findOneAndUpdate({_id: req.params.customerId}, req.body, {new: true})
		 return res.status(200).json(customer)
	}catch(err){
		
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}

}

exports.deleteCustomer = async function(req,res){
	try{
            let orders= await Order.find({customer: req.params.customerId})
			await Order.deleteMany({_id: {$in: orders.map(order=>order._id)}});
			let foundCustomer = await Customer.findById(req.params.customerId) 
			await foundCustomer.remove();
		    return res.status(200).json({message: 'Customer deleted'});
		
		} catch(err){
			
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}

/// ======FOR FUZZY SEARCH===== \\\
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

