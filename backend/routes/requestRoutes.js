const express= require('express'),
	  router= express.Router(),
 	{ loginRequired } = require('../middleware/auth'),
	  { getRequests,
        getRequest,
	    createRequest,
		getRequestsCount,
		deleteRequest, 
	    deleteManyRequests}= require('../controller/requestController');

//prefix-- /api/appointments
router.route("/")
.get(loginRequired, getRequests)
.post( createRequest )
.delete(loginRequired, deleteManyRequests);

router.route("/total-requests")
.get(loginRequired, getRequestsCount)


router.route("/:requestId")
.get(loginRequired, getRequest)
.delete(loginRequired, deleteRequest);




module.exports = router;