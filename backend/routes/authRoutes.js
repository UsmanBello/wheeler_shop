const express= require('express'),
	  router= express.Router(),
	//   {ensureCorrectUser} = require('../middleware/auth'),
	  { signup,
        signin, }= require('../controller/authController');

//prefix-- /api/customers
router.route("/signup")
.post(signup)
router.route("/signin")
.post(signin)

module.exports = router;