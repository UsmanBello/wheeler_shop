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

// const filePath= path.join(__dirname,'../../', 'invoice.pdf');
// var file = fs.readFileSync(filePath);
// var attch = new mailgun.Attachment({data: file, filename: "invoice.pdf",  contentType: "application/pdf"});

exports.createOrder = async function(req,res){
	try{   
		
		//Find the purchased products
		//If any of the data is not inserted correctly, return error(eg if customer email is associated with othe name)
		//If products qty is less than qty purchsed, return error with out of stock of the products if not, update countInStock
		//Create payment
		//If payment is completed, create order, customer and then sendEmail

		//Error handling
		console.log(req.body)
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

		const orderId = nanoid(15)
		console.log(orderId)
        console.log(req.body)

			let purchacedProducts= await Product.find({ 
				_id: {
					$in: [...req.body.items.map(item=>item.product)]
				}
			});
			var orderObjects=[]
			var totalCost=0

			req.body.items.forEach(async (item,index)=>{
				try{
				//Getting each product from database
				var thisProduct=(purchacedProducts.filter(product=> product._id.toString()===item.product.toString()))[0]
				//Checking if product is available and updating count in stock after sales
				if(thisProduct.countInStock < item.qty){
					if(thisProduct.countInStock === 0){
					return res.status(400).json({message: `${thisProduct.name} is out of stock.`})
					}else{
						return res.status(400).json({message: `Sorry, ${thisProduct.name} is only ${thisProduct.countInStock} in stock.`})
					}
				}else{
					let remainingInStock= thisProduct.countInStock - item.qty
					await Product.findOneAndUpdate({_id: thisProduct._id}, {...req.body, countInStock: remainingInStock}, {new: true})
				}
				//Creating info needed to be saved in the Order collection
				orderObjects[index]= {product: thisProduct.name,  price: Number(thisProduct.price), qty: Number(item.qty)} 
				totalCost+= (item.qty * thisProduct.price)
			}catch(e){
				console.log(e)
				return res.status(400).json({message: e.message})
			}
			})

			// var result= await stripe.paymentIntents.create({
			// 	amount: totalCost*100,//AMOUNT IN CENTS
			// 	currency: 'AED',
			// 	description: `Order #${orderId} payment`,
			// 	payment_method: req.body.id,
			// 	confirm: true
			// })
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
			var result= await stripe.paymentIntents.create({
				amount: req.body.shipping==='flatRate' ? (totalCost+60)*100 : totalCost*100,//AMOUNT IN CENTS
				currency: 'AED',
				description: `Order #${orderId} payment`,
				payment_method: req.body.id,
				confirm: true
			})
			// console.log(result)
			customer.latestUpdate= new Date()
			customer.orders.push(order._id)
			order.populate("customer",{fullName: true})
			await customer.save();
			await order.save()
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
		
		//  await createInvoice(invoiceData/*,'invoice.pdf'*/, req.body.customer.email, req.body.customer.fullName)
		
		var message = await sendEmail('noreply@the-aleph.com', 
							req.body.customer.email,
							'Invoice Payment Confirmation',
							'Dear '+req.body.customer.firstName+',\n\n' + ' Thank you for your purchase. Please find attached your invoice for the purchase made.\n', 
"<div style='padding:20px auto;'>"+
  "<div style='padding:30px; background-color:#ededed;color:black;'>"+
	"<img src='cid:logo.png' width='40px'>"+
		"<h3 style='font-size:1.25rem; margin-top:0px;'>Dear "+req.body.customer.fullName+",</h3>"+
        "<p style='font-size:1.25rem; margin:0px auto;'>Thank you for your purchase</p>"+
		"<p style='font-size:1.25rem; margin:0px auto;'>Please find attached the invoice for the purchase.</p>"+
		"</div></div></div>"/*, attch*/);
	 console.log(message)
return res.status(200).json(order);

		} catch(err){
			console.log(err)
			// if(err.Error){
			// 	return res.status(err.Error.statusCode || 500).json({
			// 		error: {
			// 			message: err.Error || "Oops something went wrong." 
			// 		}
			// 	})
			// }
			if(err.raw.message){//error from stripe
				
				return res.status(err.raw.statusCode || 500).json({message: err.raw.message || "Oops something went wrong."})
			}
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
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
           console.log(req.query)
			const qParams=req.query
			const page= +qParams.page || 1;
			const skipValue= (page-1)* qParams.ordersPerPage;
			var query={}
			if(qParams.searchTerm){
				qParams.searchTerm ? query._id=qParams.searchTerm : null
			}
			let orders= await Order.find({...query}).skip(skipValue).limit(Number(qParams.orderPerPage))
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