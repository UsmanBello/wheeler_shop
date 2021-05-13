

import './AddToCart.css'

const AddToCart=({product, qty, handleQtyChange, addToCartHandler, loadingToCart})=>{
	
	return (<div className='product__addToCart'>
			      <p className='product__name'>
					  {product.name}
				  </p>
                  <p>
                    Price: <span> ${product.price}</span>
                  </p>
                  <p>
                    status: <span>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</span>
                  </p>
                  <p>
                    Qty
                    <select value={qty} onChange={(e)=>handleQtyChange(e)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                    </select>
                  </p>
                  <p>
                    <button type='button' onClick={()=>addToCartHandler()}  disabled={loadingToCart}>
						{loadingToCart ? 'Loading...' : 'Add to cart'}</button>
                  </p>
              </div>)
}
export default AddToCart