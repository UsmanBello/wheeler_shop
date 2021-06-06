import { useState } from 'react';
import {getAmount, getDiscountedAmount} from '../../../../utils/helpers';
import './AddToCart.css'

//COMPONENT
import QuantityForm from '../../../../components/QuantityForm/QuantityForm'

const AddToCart=({product, qty, handleQtyChange, addToCartHandler, loadingToCart, showRequestModal})=>{
	
  const [quantity, setQuantity]=useState(qty)

 
  const increaseQty=()=>{
    let val = quantity
       if(val+1 <= product.countInStock){
         setQuantity(val+1)
         handleQtyChange(val+1)
       }
  }
  const decreaseQty=()=>{
    let val = quantity
    if(val-1 >0){
     
      setQuantity(val-1)
      handleQtyChange(val-1)
    }
  }
	return (<div className='product__addToCart'>
			      <p className='product__name'>
					  {product.name}
				  </p>
                {product.sales > 0 ?
                <>
                    <p>
                    Price: <span><span className='old__price'>AED {getAmount(product.price)}</span><br/><span className='current__price'> AED {getDiscountedAmount(product.price, product.sales)}</span></span>
                   </p>
                </>
                :
                  <p>
                   Price: <span className='current__price'> AED {getAmount(product.price)}</span>
                  </p>}

                  <p>
                    status: <span>{product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}</span>
                  </p>
                  <p>
                    Qty
                    <QuantityForm 
                    qty={quantity}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    />
                   
                  </p>
                  <p>
                  {product.countInStock> 0 ?
                   <button type='button' 
                   onClick={()=>addToCartHandler()} 
                    disabled={loadingToCart}>
						              {loadingToCart ? 'Loading...' : 'Add to cart'}
                      </button>: 
                      <button onClick={()=>showRequestModal()}>
                         Request Product
                      </button>
                }
                  </p>
              </div>)
}
export default AddToCart
                    