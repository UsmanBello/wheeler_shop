import './CartScreen.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link } from 'react-router-dom';
import {getAmount} from '../../utils/helpers';
//Components
import CartItem from '../../components/CartItem/CartItem';
//Actions
import{ getSomeProducts } from '../../redux/actions/productActions'
import { addToCart, removeFromCart }  from '../../redux/actions/cartActions'
import CheckoutHeader from '../../components/CheckoutHeader/CheckoutHeader';
import { product } from '../../redux/reducers/productReducers';


const  CartScreen=({ history, location })=> {

const dispatch = useDispatch()
const cart = useSelector( state=> state.cart);
const { cartItems } = cart
const productState= useSelector( state=> state.product)
const { loading, someProducts }= productState

const [isUpdate, setIsUpdate]= useState(false)
useEffect(()=>{
if(isUpdate && !loading){
    someProducts.forEach(product=>{
       let thisItem= cartItems.filter(item=>item.product===product._id)[0]
       if(product.countInStock===0){
         dispatch(removeFromCart(thisItem.product))
       }else if(product.countInStock> 0 &&  product.countInStock < thisItem.qty ){
         dispatch(addToCart(thisItem.product, product.countInStock))
       }
    })
}
},[dispatch, isUpdate, someProducts])


const qtyChangeHandler = (id, qty) =>{
  dispatch(addToCart(id, qty))
}

const removeHandler = (id) => {
   dispatch(removeFromCart(id))
}
const getCartCount = () => {
  return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
};
const getCartItemsIds = () =>{
   return cartItems.map(item=> item.product)
}
const updateCart=()=>{
  const idsInCart= getCartItemsIds()
   console.log(idsInCart)
  dispatch(getSomeProducts(idsInCart))
  setIsUpdate(true)
}
const getCartSubTotal = () => {
  return cartItems
    .reduce((price, item) => price + item.price * item.qty, 0)
    // .toFixed(2);
};
  return (
    
      cartItems.length === 0 ? 
      (<div className='cartscreen__page__empty'>
         <CheckoutHeader currentLocation={location.pathname}/>
         <div className="cartscreen__page__empty__content">
        <p>Your cart is currently empty. </p>
        <button className="cartscreen__continue__shopping" onClick={()=>history.push('/shop')}>
          Return to shop
        </button>
        </div>
      </div>) : 
    <div className='cartscreen__page'>
    <CheckoutHeader currentLocation={location.pathname}/>
    <div className='cartscreen'>
          <div className='cartscreen__left'>
                {
                cartItems.map(item=>
                   <CartItem 
                   key={item.product}
                   item={item} 
                   qtyChangeHandler={qtyChangeHandler}
                   removeHandler={removeHandler}/> )
                }
              
              <button className='cartscreen__continue__shopping' onClick={()=>history.push('/shop')}>
                Continue shopping
              </button>
              <button className='cartscreen__update__cart' onClick={()=>updateCart()}>
                Update cart
              </button>
          </div>
        <div className='cartscreen__right'>
              <div className='cartscreen__info'>
                  <p> Subtotal ({getCartCount()}) items</p>
                  <p>AED {getAmount(getCartSubTotal())}</p>
              </div>
              <div>
                <button onClick={()=>history.push({pathname:'/checkout',state:{prev:'legitimatePreviousRoute'}})}>Proceed To Checkout</button>
              </div>
        </div>
    </div>
    </div>
  );
}

export default CartScreen;
