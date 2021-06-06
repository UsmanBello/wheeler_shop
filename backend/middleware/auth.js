require("dotenv").config();
const jwt = require("jsonwebtoken");

/* We still have to use a call back function because this library has not been promisified yet*/


//Make sure the user is logged in - Authentication
exports.loginRequired= function(req, res, next){
	
	try{//its not an async, but its still good we use try catch
		
	const token = req.headers.authorization.split(" ")[1];//header "bearer <token>
		
	jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){ 
        
		if(decoded){// we dont care whats in the payload, we just wanna know there is a token move to d next,
			next();
		}else{ 
			return next({
				status: 401, 
				message: "You are not authorised to perfoem this action."
			})
		}
	})
	}
	catch(e){//if there is an issue with the header not being passed in or interpreted correctly
		return next({
			    status: 401, /////unauthorised
				message: "You are not authorised to perfoem this action."
		})
	}
}


//Make sure we get the current user - authorization
exports.ensureCorrectUser= function(req, res, next){
	try{
		const token = req.headers.authorization.split(" ")[1];//header "bearer
		
	jwt.verify(token, process.env.SECRET_KEY, function(err,decoded){ 
		if(decoded && decoded.id ===req.params.id){ //not just if theres a token, but if the id in it is the same user id in the url 
		 return next();
		}else{
			return next({
				status: 401,
				message: "You are not authorised to perfoem this action."
			})
		}
	});
	}catch(e){
		 return next({
				status: 401,
				message: "You are not authorised to perfoem this action." 
		 })
	}
	
}