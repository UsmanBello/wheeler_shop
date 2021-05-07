const express= require('express'),
	  router= express.Router(),
	//   {ensureCorrectUser} = require('../middleware/auth'),
	  
	  
	  { getOrders,
        getOrder,
		getOrdersCount,
		getCustomerOrders,
	    createOrder,
        updateOrder,
		deleteOrder, 
	    deleteManyOrders }= require('../controller/orderController');

//prefix-- /api/appointments
router.route("/")
.get(getOrders)
.post(createOrder)
.delete(deleteManyOrders);

router.route("/totalOrders")
.get(getOrdersCount)

router.route('/customer/:customerId')
.get(getCustomerOrders)

router.route("/:orderId")
.get(getOrder)
.put(updateOrder)
.delete(deleteOrder);




module.exports = router;