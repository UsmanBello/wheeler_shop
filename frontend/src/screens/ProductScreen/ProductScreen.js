import './ProductScreen.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { getProductDetails } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions'

const  ProductScreen=({match, history})=> {

  const [qty, setQty]= useState(1)
  const dispatch = useDispatch()

  const productState = useSelector( state=> state.product)
  
  const { loading, error, product } = productState

  useEffect(()=>{
    if(product && match.params.id !== product._id){
      dispatch(getProductDetails(match.params.id))
    }
  },[dispatch, product, match])

  const addToCartHandler = () =>{
    dispatch(addToCart(product._id, qty))
    history.push('/cart')
  }


  return (
    <div className='product-scrren'>
      {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2>  : 
      <>
        <div className='productscreen__left'>
            <div className='left__image'>
              <img src={product.imageUrl}
                    alt={product.name}/>
            </div>
              <div className='left__info'>
                  <p className='left__name'>{product.name}</p>
                  <p className='left__price'>${product.price}</p>
                  <p className='left__description'>{product.description}</p>
              </div>
        </div>
        <div className='productscreen__right'>
              <div className='right__info'>
                  <p>
                    Price: <span> ${product.price}</span>
                  </p>
                  <p>
                    status: <span>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</span>
                  </p>
                  <p>
                    Qty
                    <select value={qty} onChange={(e)=>setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                    </select>
                  </p>
                  <p>
                    <button type='button' onClick={addToCartHandler}>Add to cart</button>
                  </p>
              </div>
        </div>
        </>
}
    </div>
  );
}

export default ProductScreen;