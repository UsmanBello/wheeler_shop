import './ProductScreen.css';
import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';


//COMPONENTS IMPORTS
import RelatedProducts from './ProductScreenComponents/RelatedProducts/RelatedProducts';
import ProductDescription from './ProductScreenComponents/ProductDescription/ProductDescription';
import ProductImages from './ProductScreenComponents/ProductImages/ProductImages';
import AddToCart from './ProductScreenComponents/AddToCart/AddToCart';
import PreviewCart from './ProductScreenComponents/PreviewCart/PreviewCart';
//ACTIONS IMPORTS
import { getProductDetails, 
		getRelatedProducts, 
		removeProductDetails,
		removeRelatedProducts } from '../../redux/actions/productActions';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';


const  ProductScreen=({match, history})=> {

  const [qty, setQty]= useState(1)
  const dispatch = useDispatch()
  const [currentImage, setCurrentImage]= useState(0)

  const productState = useSelector( state=> state.product)
  const cart = useSelector( state=> state.cart);
  
  const { loading, error, product, relatedProducts} = productState
  const { loadingToCart, cartError, cartItems } = cart
 
  useEffect(()=>{
	 return()=>{
	    dispatch(removeRelatedProducts())
	 }
  },[])
	
  useEffect(()=>{
    if(product && match.params.id !== product._id){
          dispatch(getProductDetails(match.params.id))
    }
  },[dispatch, product, match])
  
	
  useEffect(()=>{
	  if(product && match.params.id !== product._id){
            dispatch(getRelatedProducts(match.params.id))
	  }
  },[dispatch, product, match])

	//===================================PRODUCT IMAGE VIEW LOGIC====================================//
  const addToCartHandler = () =>{
	  
         dispatch(addToCart(product._id, qty))
    // history.push('/cart')
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
//==========================================================================================//
  
//====================================CART PREVIEW LOGIC====================================//
const removeHandler = (id) => {
   dispatch(removeFromCart(id))
}

const getCartSubTotal = () => {
  return cartItems
    .reduce((price, item) => price + item.price * item.qty, 0)
    .toFixed(2);
};
//==========================================================================================//
  return (
	  loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2>  : 
    <div className='product__screen'>
		  <section className='product__screen__section1'>
        <div className='productscreen__left'>
         
            <ProductImages
					 product={product}
					 currentImage={currentImage}
					 handleShowImage={showImage}
					 handleRightClick={handleRightClick}
					 handleLeftClick={handleLeftClick}/>
      
              <AddToCart 
				  product={product}
				  handleQtyChange={(e)=>setQty(e.target.value)}
				  qty={qty}
				  addToCartHandler={addToCartHandler}
				  loadingToCart={loadingToCart}/>
              
        </div>
            
        <div className='productscreen__right'>
			<PreviewCart cartItems={cartItems}
				removeHandler={removeHandler} 
				history={history} 
				getCartSubTotal={getCartSubTotal}/>
        </div>
            

		  </section>
		  <hr className='product__screen__horizontal__line'/>
		  <section className='product__screen__section2'>
			  <ProductDescription product={product}/>
		  </section>
		  <hr className='product__screen__horizontal__line'/>
		  <section className='product__screen__section3'>
			  <div className='section__header'>
				  <h2>Related Products</h2>
			  </div>
			  <RelatedProducts products={relatedProducts}/>
		  </section>
		  
    </div>
  );
}
// 

				// 
export default ProductScreen;