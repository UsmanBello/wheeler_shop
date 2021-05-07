import './ProductScreen.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { getProductDetails } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions'

const  ProductScreen=({match, history})=> {

  const [qty, setQty]= useState(1)
  const dispatch = useDispatch()
  const [currentImage, setCurrentImage]= useState(0)

  const productState = useSelector( state=> state.product)
  
  const { loading, error, product } = productState
console.log(typeof currentImage)
  useEffect(()=>{
    if(product && match.params.id !== product._id){
      dispatch(getProductDetails(match.params.id))
    }
  },[dispatch, product, match])

  const addToCartHandler = () =>{
    dispatch(addToCart(product._id, qty))
    history.push('/cart')
  }
  const showImage=(index)=>{
      setCurrentImage(index)
  }

  const handleLeftClick=()=>{
       if(currentImage===0){
         setCurrentImage(product.images.length-1)
         document.getElementById('images__slider').scrollLeft=(product.images.length-1)*180;

       }else{
        
         setCurrentImage(currentImage-1)
         document.getElementById('images__slider').scrollLeft-=180
         
       }
  }
  const handleRightClick=()=>{
          if(currentImage===product.images.length-1){
              setCurrentImage(0)
              document.getElementById('images__slider').scrollLeft=0

          }else{
                setCurrentImage(currentImage+1)
              document.getElementById('images__slider').scrollLeft+=180

          }
  }
  return (
    <div className='product-scrren'>
      {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2>  : 
      <>{ product!==undefined && 
      <> 
        <div className='productscreen__left'>
          
            <div className='left__image'>
              
              <img src={product.images[currentImage].image}
                    id='featured'
                    alt={product.name}/>
              <div className='slide__wrapper__container'>

                <div className='arrow__button__container'>
                 <i className="fa fa-chevron-circle-left" aria-hidden="true" onClick={()=>handleLeftClick()}></i>
                </div>

                <div id='images__slider'>
                {
                    product.images.map((image, index)=>{
                      return <img src={image.image} alt={product.name}
                                   width='200px'
                                  className={currentImage===index ? 'clear thumbnail': 'blur thumbnail'}
                                  onClick={()=>showImage(index)}
                                 /* onMouseOver={()=>showImage(index)}*/
                                 />
                    })
                }
               
                </div>
                <div className='arrow__button__container'>
                <i className="fa fa-chevron-circle-right"  onClick={()=>handleRightClick()}></i>
                </div>
              </div>
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
        </>
}
    </div>
  );
}

export default ProductScreen;