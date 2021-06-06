require('dotenv').config({path: '../'})
const Request = require('../models/Request');

// const filePath= path.join(__dirname,'../../', 'invoice.pdf');
// var file = fs.readFileSync(filePath);
// var attch = new mailgun.Attachment({data: file, filename: "invoice.pdf",  contentType: "application/pdf"});

exports.createRequest = async function(req,res){
    if(!req.body.fullName){
        return res.status(400).json({ message: "Full name is required."})
    }else if(!req.body.email){
        return res.status(400).json({ message: "Email is required."})``
    }else if(!req.body.phone){
        return res.status(400).json({ message: "Phone number is required."})``
    }else if(!req.body.product){

    }
	try{
        const request = await Request.create({fullName: req.body.fullName,
                                              email: req.body.email,
                                              phone: req.body.phone,
                                              product: req.body.product,
											  createdAt: new Date()})
        await request.save();
        return res.status(200).json(request);

    }catch(err){
        return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."}) 
    }
}

exports.getRequestsCount = async function(req,res){
	
	try{ 
			  var count= await Request.find().countDocuments()
			  return res.status(200).json({totalrequests: count});
		} catch(err){
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}
}

exports.getRequests = async function(req,res){
	try{
            const qParams=req.query
            const page= +qParams.page || 1;
            const skipValue= (page-1)* Number(qParams.requestsPerPage);
            var query={}
            if(qParams.searchTerm){
                qParams.searchTerm ? query.invoiceNo=qParams.searchTerm : null
            }

			let requests= await Request.find({...query}).sort({createdAt: "desc"}).skip(skipValue).limit(Number(qParams.requestsPerPage))
			let count = await Request.find({...query}).countDocuments()
			return res.status(200).json({requests, count});
		} catch(err){
			console.log(err)

			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}

exports.getRequest = async function(req,res){
	try{
		let request = await Request.findById(req.params.requestId)
		return res.status(200).json(request);
	}catch(err){
		return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
	}
}

exports.deleteRequest = async function(req,res){
	try{
			let foundRequest = await Request.findById(req.params.requestId) 
			await foundRequest.remove();
		    return res.status(200).json({message: 'Request deleted'});
		
		} catch(err){
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}


exports.deleteManyRequests = async function(req,res){
	try{
			 await Request.deleteMany({_id: {$in: req.body.list}});
			return res.status(200).json({message: 'Requests deleted'});
		} catch(err){
			return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})
		}

}

