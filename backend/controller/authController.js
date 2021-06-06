require("dotenv").config();
const User=require('../models/User');
const jwt=require('jsonwebtoken'); 


const signToken=(response, data, secreteKey)=>{
	//IF IT MATCHES LOG THEM IN...ie signing or creating a json web token  and sending it back in the response
	// console.log("sign in successful")
	try{
		let token = jwt.sign(data,secreteKey );
	
		return response.status(200).json({...data, token})
		}catch(err){
			console.log(err)
			return response.status(400).json({message: err.message || "Oops something went wrong."})
		}
}


exports.signup= async function(req, res){
	try{
		//CREATE A USER
		let user= await User.create(req.body);
		let {id,  email, firstName, lastName}= user;
		console.log(user)
		
		signToken(res, {id,  email, firstName, lastName}, process.env.SECRET_KEY)
	// 	//CREATE A TOKEN (signing a token)
	// 	let token = jwt.sign({id, email, firstName, lastName},process.env.SECRET_KEY);
	// 	//send this information back.. this will be very helpful when we use javascript to collect this data
	// 	return res.status(200).json({id, email, firstName, lastName, token})
		
	}
	catch(err){
		//if a validation fails
		if(err.code===11000){//the way mongoose handles error
			err.message="Sorry, that email is taken";
		}
        return res.status(err.status || 500).json({message: err.message || "Oops something went wrong."})

	}

}

exports.signin= async function(req,res){

	try{
	//FINDING A USER
	let user = await User.findOne({email: req.body.email});

	//CHECKING IF THEIR PASSWORD MATCHESW WHAT WAS SAVED IN THE SERVER
	let {id, email, firstName, lastName}= user;
	
	let isMatch= await user.comparePassword(req.body.password);
	if(isMatch){
		signToken(res, {id, email, firstName, lastName}, process.env.SECRET_KEY)
		
	} else {
		
        return res.status(400).json({message: "Invalid email or password" || "Oops something went wrong."})
	}
	}
	catch(err){
		console.log(err)
        return res.status(err.status).json({message: err.message || "Oops something went wrong."})

	}

	
	
}


