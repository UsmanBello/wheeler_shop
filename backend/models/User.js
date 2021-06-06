const mongoose = require("mongoose");
const bcrypt=require('bcrypt');

const userSchema = mongoose.Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
    type: String,
    required: true
},
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  }
});

//A PRE SAVE HOOK WHICH IS WE RUN A FUNCTION(AN ASYNC) BEFORE WE SAVE EACH DOCUMENT IN MONGOOSE 
	
userSchema.pre("save",async function(next){
	try{
		if(!this.isModified("password")){
			return next();
		}
		let hashedPassword= await bcrypt.hash(this.password, 10);
		this.password=hashedPassword
		return next();
		
	}catch(err){
		return next(err);
	}

});

userSchema.methods.comparePassword= async function(candidatePassword,next){
	try{
        
	  let isMatch= await bcrypt.compare(candidatePassword,this.password);
	  return isMatch; 
	
	}catch(err){
		
	return next(err);
   }
};



const User= mongoose.model("user", userSchema);

module.exports = User;