import './CartScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import {Link } from 'react-router-dom';
//Components
import CartItem from '../../components/CartItem/CartItem';
//Actions
import { addToCart, removeFromCart }  from '../../redux/actions/cartActions'
import CheckoutHeader from '../../components/CheckoutHeader/CheckoutHeader';


const  CartScreen=({ history, location })=> {

const dispatch = useDispatch()
const cart = useSelector( state=> state.cart);
const { cartItems } = cart

const qtyChangeHandler = (id, qty) =>{
    dispatch(addToCart(id, qty))
  
} 

const removeHandler = (id) => {
   dispatch(removeFromCart(id))
}
const getCartCount = () => {
  return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
};

const getCartSubTotal = () => {
  return cartItems
    .reduce((price, item) => price + item.price * item.qty, 0)
    .toFixed(2);
};
  return (
    <div className='cartscreen__page'>
    <CheckoutHeader currentLocation={location.pathname}/>
    <div className='cartscreen'>
          <div className='cartscreen__left'>
              
              {
                cartItems.length === 0 ? 
                (<div>Your cart is empty 
                  <Link to='/shop'>Go to shop</Link>
                </div>) : 
                (
                cartItems.map(item=>
                   <CartItem 
                   key={item.product}
                   item={item} 
                   qtyChangeHandler={qtyChangeHandler}
                   removeHandler={removeHandler}/> )
                  )
              }
              <button className='cartscreen__continue__shopping' onClick={()=>history.push('/shop')}>
                Continue shopping
              </button>
          </div>
        <div className='cartscreen__right'>
              <div className='cartscreen__info'>
                  <p> Subtotal ({getCartCount()}) items</p>
                  <p>$ {getCartSubTotal()}</p>
              </div>
              <div>
                <button onClick={()=>history.push('/checkout')}>Proceed To Checkout</button>
              </div>
        </div>
    </div>
    </div>
  );
}

export default CartScreen;
