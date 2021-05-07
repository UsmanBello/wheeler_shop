require('dotenv').config({path: '../'})
const fs= require('fs')
const Order = require('../models/Order');
const Customer= require('../models/Customer');
const Product= require('../models/Product');
const stripe= require('../config/stripe')
const {createInvoice }= require('../config/generateInvoice')
// const sendEmail= require('../config/mailer');
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN});
const path=require('path');

// const filePath= path.join(__dirname,'../../', 'invoice.pdf');
// var file = fs.readFileSync(filePath);
// var attch = new mailgun.Attachment({data: file, filename: "invoice.pdf",  contentType: "application/pdf"});

exports.createOrder = async function(req,res){
	try{   
			let purchacedProducts= await Product.find({ 
				_id: {
					$in: [...req.body.items.map(item=>item.product)]
				}
			});
			var orderObjects=[]
			var totalCost=0
			req.body.items.forEach((item,index)=>{
				var thisProduct=(purchacedProducts.filter(product=> product._id.toString()===item.product.toString()))[0]
				orderObjects[index]= {product: thisProduct.name,  price: Number(thisProduct.price), qty: Number(item.qty)} 
				totalCost+= (item.qty * thisProduct.price)
			})
			var customer = await Customer.findOne({email: req.body.customer.email})
			if(!customer){
				customer=  await Customer.create({
							fullName: req.body.customer.fullName,
							email: req.body.customer.email,
							street: req.body.customer.street,
							city: req.body.customer.city,
							country: req.body.customer.country,
							zip: req.body.customer.zip,
							Phone: req.body.customer.phone
						})
			}
			let order = await Order.create({
                items: orderObjects, 
                totalCost: totalCost,
				customerName: customer.fullName,
				customer: customer._id,
				createdAt: new Date()
            });
			var result= await stripe.paymentIntents.create({
				amount: totalCost*100,//AMOUNT IN CENTS
				currency: 'AED',
				description: `Order #${order._id} payment`,
				payment_method: req.body.id,
				confirm: true
			})
			customer.lastUpdated= new Date()
			customer.orders.push(order._id)
			order.populate("customer",{fullName: true})
			await customer.save();
			await order.save()
			//======================Transaction end=================//
			//==============generating invoice=====================//
			var invoiceData = {
				shipping: {
					name: req.body.customer.fullName,
					street: req.body.customer.street,
					state: req.body.customer.state,
					country: req.body.customer.country
				},
				items: orderObjects,
				subtotal: totalCost,
				paid: totalCost,
				invoice_nr: order._id
			};
		
		 await createInvoice(invoiceData/*,'invoice.pdf'*/, req.body.customer.email, req.body.customer.fullName)
		
// 		await sendEmail('noreply@the-aleph.com', 
// 							req.body.customer.email,
// 							'Invoice Payment Confirmation',
// 							'Dear '+req.body.customer.fullName+',\n\n' + ' Thank you for your purchase. Please find attached your invoice for the purchase made.\n', 
// "<div style='padding:20px auto;'>"+
//   "<div style='padding:30px; background-color:#ededed;color:black;'>"+
// 	"<img src='cid:logo.png' width='40px'>"+
// 		"<h3 style='font-size:1.25rem; margin-top:0px;'>Dear "+req.body.customer.fullName+",</h3>"+
//         "<p style='font-size:1.25rem; margin:0px auto;'>Thank you for your purchase</p>"+
// 		"<p style='font-size:1.25rem; margin:0px auto;'>Please find attached the invoice for the purchase.</p>"+
// 		"</div></div></div>", attch);
	
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
				
				return res.status(err.raw.statusCode || 500).json({
					error: {
						message: err.raw.message || "Oops something went wrong." 
					}
				})
			}
			return res.status(err.status || 500).json({
                error: {
                     message: err.message || "Oops something went wrong."
                }})
		}

}

exports.getOrdersCount = async function(req,res){
	
	try{
           
			  var count= await Order.find().countDocuments()
				return res.status(200).json({totalorders: count});
				
		} catch(err){
			
			return res.status(err.status || 500).json({
                error: {
                    message: err.message || "Oops something went wrong."
                    
                }})
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
			return res.status(err.status || 500).json({
                error: {
                    message: err.message || "Oops something went wrong."
                    
                }})
		}

}

exports.getCustomerOrders= async function (req, res){
	try{
		let customerOrders= await Order.find({customer: req.params.customerId})
		return res.status(200).json(customerOrders);
	}catch(err){
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

	//////////////////////////////////////////////
        //    var customer = await Customer.findOne({email: req.body.customer.email})
		    
		//    if(customer){
		// 	   console.log('here')
		// 	const payment = await stripe.paymentIntents.create({
		// 		amount: totalCost*100,//AMOUNT IN CENTS
		// 		currency: 'AED',
		// 		description: 'Payment to Salwan Auto',
		// 		payment_method: req.body.id,// remember the id of paymentMethod in stripeElement from the front End
		// 		confirm: true //Normally,the intent returns a response which u have to confirm. But by setting this true, we confirm rightaway.
		// 			// metadata: {integration_check: accept_a_payment}
		// 		})
		// 		// console.log(JSON.stringify(orderObject))
		// 	let order = await Order.create({
        //         items: orderObjects,
        //         totalCost: totalCost,
		// 		customer: customer._id,
		// 		createdAt: new Date()
        //     });

		// 	customer.orders.push(order._id)
		// 	await customer.save();
		//     // await order.save();
		//     return res.status(200).json(order);
		//    }
		   
		//     var newCustomer = await Customer.create({
		// 		fullName: req.body.customer.fullName,
		// 		email: req.body.customer.email,
		// 		adress: {
		// 			street: req.body.customer.street,
		// 			city: req.body.customer.city,
		// 			country: req.body.customer.country
		// 		}
		// 	})

		// 	const payment = await stripe.paymentIntents.create({
		// 		amount: totalCost*100,//AMOUNT IN CENTS
		// 		currency: 'AED',
		// 		description: 'Payment to Salwan Auto',
		// 		payment_method: req.body.id,// remember the id of paymentMethod in stripeElement from the front End
		// 		confirm: true //Normally,the intent returns a response which u have to confirm. But by setting this true, we confirm rightaway.
		// 			// metadata: {integration_check: accept_a_payment}
		// 		})
        //     // let foundCustomer = await Customer.findById(newCustomer._id)
		// 	let order = await Order.create({
        //         items: orderObjects,
        //         totalCost: totalCost,
		// 		customer: newCustomer._id,
		// 		createdAt: new Date()
        //     });
			
		// 	newCustomer.orders.push(order._id)
		// 	await newCustomer.save();
		//     return res.status(200).json(order);