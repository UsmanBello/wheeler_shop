const express= require('express'),
	  router= express.Router(),
	  {loginRequired} = require('../middleware/auth'),
	  { getCustomers,
        getCustomer,
		getCustomersCount,
        updateCustomer,
		deleteCustomer }= require('../controller/customerController');

//prefix-- /api/customers
router.route("/")
.get(loginRequired, getCustomers)

router.route("/totalCustomers")
.get(getCustomersCount)

router.route("/:customerId")
.get(loginRequired, getCustomer)
.put(loginRequired, updateCustomer)
.delete(loginRequired, deleteCustomer);




module.exports = router;