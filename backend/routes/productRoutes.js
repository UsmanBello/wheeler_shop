const express= require('express'),
	  router= express.Router(),
	  { loginRequired } = require('../middleware/auth'),
	  { getProducts,
        getProduct,
		getProductsCount,
		getSomeProducts,
	    getRelatedProducts,
		getOutStockCount,
        updateProduct,
	    createProduct,
		deleteProduct, 
	    deleteManyProducts }= require('../controller/productController');
		
//prefix-- /api/appointments
router.route("/")
.get(getProducts)
.post(loginRequired, createProduct)
.delete(loginRequired, deleteManyProducts);


router.route("/out-of-stock-count")
.get(getOutStockCount)

router.route("/some-products")
.get(getSomeProducts)

router.route("/totalProducts")
.get(getProductsCount)


router.route("/related-products/:productId")
.get(getRelatedProducts)



router.route("/:productId")
.get(getProduct)
.put(loginRequired, updateProduct)
.delete(loginRequired, deleteProduct);



module.exports = router;