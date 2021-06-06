const express= require('express'),
	  router= express.Router(),
	  {ensureCorrectUser,loginRequired} = require('../middleware/auth'),
	  
	  
	  { getOrders,
        getOrder,
		getOrdersCount,
		getCustomerOrders,
	    createOrder,
        updateOrder,
		deleteOrder, 
	    deleteManyOrders}= require('../controller/orderController');

//prefix-- /api/appointments
router.route("/")
.get(loginRequired, getOrders)
.post(createOrder)
.delete(loginRequired, deleteManyOrders);

router.route("/totalOrders")
.get(loginRequired, getOrdersCount)


router.route('/customer/:customerId')
.get(loginRequired, getCustomerOrders)

router.route("/:orderId")
.get(loginRequired, getOrder)
.put(loginRequired, updateOrder)
.delete(loginRequired, deleteOrder);




module.exports = router;