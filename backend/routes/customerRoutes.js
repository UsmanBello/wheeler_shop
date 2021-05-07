const express= require('express'),
	  router= express.Router(),
	//   {ensureCorrectUser} = require('../middleware/auth'),
	  { getCustomers,
        getCustomer,
		getCustomersCount,
        updateCustomer,
		deleteCustomer }= require('../controller/customerController');

//prefix-- /api/customers
router.route("/")
.get(getCustomers)

router.route("/totalCustomers")
.get(getCustomersCount)

router.route("/:customerId")
.get(getCustomer)
.put(updateCustomer)
.delete(deleteCustomer);




module.exports = router;