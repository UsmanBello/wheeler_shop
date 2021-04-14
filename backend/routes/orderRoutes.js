const express= require('express'),
	  router= express.Router(),
	//   {ensureCorrectUser} = require('../middleware/auth'),
	  
	  
	  { getOrders,
        getOrder,
	    createOrder,
        updateOrder,
		deleteOrder, 
	    deleteManyOrders }= require('../controller/orderController');

//prefix-- /api/appointments
router.route("/")
.get(getOrders)
.post(createOrder)
.delete(deleteManyOrders);


router.route("/:orderId")
.get(getOrder)
.put(updateOrder)
.delete(deleteOrder);




module.exports = router;