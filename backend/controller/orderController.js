require('dotenv').config({path: '../'})
const fs= require('fs')
const Order = require('../models/Order');
const Customer= require('../models/Customer');
const Product= require('../models/Product');
const { nanoid }= require('nanoid')
const stripe= require('../config/stripe')
const {createInvoice }= require('../config/generateInvoice')
const sendEmail= require('../config/mailer');
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN});
const path=require('path');

const { concatProductNames } = require('../helpers')

var currentId=''

// const filePath= path.join(__dirname,'../../', 'invoice.pdf');
// var file = fs.readFileSync(filePath);
// var attch = new mailgun.Attachment({data: file, filename: "invoice.pdf",  contentType: "application/pdf"});

exports.createOrder = async function(req,res){
		if(!req.body.customer.firstName){
			return res.status(400).json({ message: "First name is required."})
		}
		if(req.body.customer.lastName ===''){
			return res.status(400).json({ message: "Last name is required."})
		}
		if(req.body.customer.email ===''){
			return res.status(400).json({message: "Email name is required."})
		}
		if(req.body.customer.street ===''){
			return res.status(400).json({ message: "Street is required."})
		}
		if(req.body.customer.city ===''){
			return res.status(400).json({message: "City is required."})
		}
		if(req.body.customer.country ===''){
			return res.status(400).json({message: "Country is required."})
		}
		if(req.body.customer.street ===''){
			return res.status(400).json({ message: "Street is required."})
		}
		if(req.body.customer.phone ===''){
			return res.status(400).json({message: "Phone number is required."})
		}

		
		try{ 
			let purchacedProducts= await Product.find({ 
				_id: {
					$in: [...req.body.items.map(item=>item.product)]
				}
			});
			var orderObjects=[]
			var totalCost=0
			var countInStockAfterPurchase=[]
            var outOfStock=[]

			req.body.items.forEach((item,index)=>{
				//Getting each product from database
				var thisProduct=(purchacedProducts.filter(product=> product._id.toString()===item.product.toString()))[0]
				//Checking if product is available and updating count in stock after sales
				if(Number(thisProduct.countInStock) < Number(item.qty)){
					outOfStock.push(thisProduct.name)
				}else{
					let remainingInStock= Number(thisProduct.countInStock) - Number(item.qty)
					countInStockAfterPurchase[index]={_id: thisProduct._id, remainingInStock}
				}
				//Creating info needed to be saved in the Order collection
				orderObjects[index]= {product: thisProduct.name,  price: Number(thisProduct.price), qty: Number(item.qty)} 
				totalCost+= (item.qty * thisProduct.price)
			
			})
				//exit from purchase if product out of stock
			if(outOfStock.length > 1){
				const outOfStockProductsNames= concatProductNames(outOfStock)
				return res.status(400).json({message: `These products are out of stock or have less quantity than you ordered-( ${outOfStockProductsNames} ).`})
			}

			var customer = await Customer.findOne({email: req.body.customer.email})
			if(!customer){
				customer=  await Customer.create({
							firstName: req.body.customer.firstName,
							lastName: req.body.customer.lastName,
							email: req.body.customer.email,
							street: req.body.customer.street,
							city: req.body.customer.city,
							country: req.body.customer.country,
							phone: req.body.customer.phone.toString()
						})
			}
			const orderId = nanoid(15)
			let order = await Order.create({
				invoiceNo: orderId,
                items: orderObjects, 
                totalCost: totalCost,
				customerName: customer.firstName+' '+customer.lastName,
				customer: customer._id,
				createdAt: new Date(),
				paymentType: req.body.payment,
				shipping: req.body.shipping
            });
			currentId= order._id.toString()
			customer.latestUpdate= new Date()
			customer.orders.push(order._id)

			await order.save()
			await customer.save();
			console.log('even bordered coming here')
			if(req.body.payment==='card'){
			var result= await stripe.paymentIntents.create({
				amount: req.body.shipping==='flatRate' ? (totalCost+6000) : totalCost,//AMOUNT IN CENTS
				currency: 'AED',
				description: `Order #${orderId} payment`,
				payment_method: req.body.id,
				confirm: true
			})
			console.log(result.client_secret)
		   }
			// console.log(result.last_payment_error)
			order.transactionStatus={status:'Success', message: 'successful transaction'}
			await order.save()
			console.log(countInStockAfterPurchase)

			//Update countInStock
			for(var item of req.body.items){
				
				let remainingInStock =countInStockAfterPurchase.filter(obj=>obj._id.toString()===item.product.toString())[0]
				console.log(remainingInStock)
				await Product.findOneAndUpdate({_id: item.product}, {...req.body, countInStock: remainingInStock.remainingInStock}, {new: true})
			}
			
			//======================Transaction end=================//
			//==============generating invoice=====================//
			var invoiceData = {
				shipping: {
					name: req.body.customer.firstName+' '+req.body.customer.lastName,
					street: req.body.customer.street,
					state: req.body.customer.city,
					country: req.body.customer.country
				},
				items: orderObjects,
				subtotal: totalCost,
				paid: totalCost,
				invoice_nr: order.invoiceNo
			};
		console.log(req.body.customer.firstName)
		//  await createInvoice(invoiceData/*,'invoice.pdf'*/, req.body.customer.email, req.body.customer.fullName)
		
		var message = await sendEmail('noreply@the-aleph.com', 
							req.body.customer.email,
							'Invoice Payment Confirmation',
							'Dear '+req.body.customer.firstName+',\n\n' + ' Thank you for your purchase. Please find attached your invoice for the purchase made.\n', 
"<div style='padding:20px auto;'>"+
  "<div style='padding:30px; background-color:#ededed;color:black;'>"+
	"<img src='cid:logo.png' width='40px'>"+
		"<h3 style='font-size:1.25rem; margin-top:0px;'>Dear "+req.body.customer.firstName+",</h3>"+
        "<p style='font-size:1.25rem; margin:0px auto;'>Thank you for your purchase</p>"+
		"<p style='font-size:1.25rem; margin:0px auto;'>Please find attached the invoice for the purchase.</p>"+
		"</div></div></div>",/*, attch*/);
	 console.log(message)
return res.status(200).json(order);

		} catch(err){
			// console.log(err)
			try{
			if(err.raw.message){
				console.log(err.raw.message)

				const order= await Order.findById( currentId)
				 order.transactionStatus= {status:'Fail', message: err.raw.message}
				 await order.save()
				return res.status(err.raw.statusCode || 500).json({message: err.raw.message || "Oops something went wrong."})
			}
				const order= await Order.findById( currentId)
				order.transactionStatus= {status:'Fail', message: err.message}
				await order.save()
				// await Order.findOneAndUpdate({_id: currentId}, {...req.body, transactionStatus:{status:'Fail', message: err.message}}, {new: true})
				return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}catch(err){
			console.log(err)
		}
		}

}

exports.getOrdersCount = async function(req,res){
	try{
			  var count= await Order.find().countDocuments()
				return res.status(200).json({totalorders: count});
				
		} catch(err){
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}
	
}
exports.getOrders = async function(req,res){
	try{
			const qParams=req.query
			const page= +qParams.page || 1;
			const skipValue= (page-1)* Number(qParams.ordersPerPage);
			var query={}
			if(qParams.searchTerm){
				qParams.searchTerm ? query.invoiceNo=qParams.searchTerm : null
			}
			if(qParams.status && qParams.status!=='allOrders'){
				qParams.status ? query.status=qParams.status : null 
			}
			let orders= await Order.find({...query}).sort({createdAt: "desc"}).skip(skipValue).limit(Number(qParams.ordersPerPage))
			let count = await Order.find({...query}).countDocuments()
			return res.status(200).json({orders, count});
		} catch(err){
			console.log(err)

			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}

exports.getCustomerOrders= async function (req, res){
	try{
		let customerOrders= await Order.find({customer: req.params.customerId})
		return res.status(200).json(customerOrders);
	}catch(err){
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}
}

exports.getOrder = async function(req,res){
	try{
		let order = await Order.findById(req.params.orderId)
		return res.status(200).json(order);
	}catch(err){
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}
}

exports.updateOrder = async function(req,res){
	try{
		var order= await Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new: true})
		  return res.status(200).json(order)
		  //JUST TO MAKE SURE NOTHING ELSE IS EDITED
		// if(req.body.status && Object.keys(req.body).length === 1){
		// var order= await Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new: true})
		//  return res.status(200).json(order)
		// }else{
		// 	return res.status(401).json({message: "You are not allowed to change order information. You can only change status"})
		// }
	}catch(err){
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}

}

exports.deleteOrder = async function(req,res){
	try{
            
			let foundOrder = await Order.findById(req.params.orderId) 
			let foundCustomer= await Customer.findById(foundOrder.customer)
			console.log(foundOrder._id)
			console.log(typeof foundCustomer.orders[0])
			console.log(foundCustomer.orders)
			console.log(foundCustomer.orders.filter(order=>order.toString()!==foundOrder._id.toString()))
			foundCustomer.orders= foundCustomer.orders.filter(order=>order.toString()!==foundOrder._id.toString())
			await foundCustomer.save()
			await foundOrder.remove();
		    return res.status(200).json({message: 'Order deleted'});
		
		} catch(err){
			
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}


exports.deleteManyOrders = async function(req,res){
	try{
			 await Order.deleteMany({_id: {$in: req.body.list}});
			return res.status(200).json({message: 'Orders deleted'});
		} catch(err){
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}

