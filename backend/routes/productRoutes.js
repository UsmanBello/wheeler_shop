const express= require('express'),
	  router= express.Router(),
	//   {ensureCorrectUser} = require('../middleware/auth'),
	  
	  
	  { getProducts,
        getProduct,
		getProductsCount,
        updateProduct,
	    createProduct,
		deleteProduct, 
	    deleteManyProducts }= require('../controller/productController');

//prefix-- /api/appointments
router.route("/")
.get(getProducts)
.post(createProduct)
.delete(deleteManyProducts);

router.route("/totalProducts")
.get(getProductsCount)




router.route("/:productId")
.get(getProduct)
.put(updateProduct)
.delete(deleteProduct);



module.exports = router;