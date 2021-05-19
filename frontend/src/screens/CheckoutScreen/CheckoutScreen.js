import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//ACTIONS
import { removeOrderDetails } from '../../redux/actions/orderActions'
//COMPONENTS
import StripeElement from './Checkout/StripeElement';
import CheckoutHeader from '../../components/CheckoutHeader/CheckoutHeader';
import YourOrder from './Checkout/YourOrder'
import './CheckoutScreen.css'



const CheckoutScreen=({location, history})=>{

    const [shippingOption, setShippingOption]= useState('flatRate')
    const [hideOrder, setHideOrder]= useState(false)
    const dispatch = useDispatch()
    const cart= useSelector(state=>state.cart)
    const { cartItems } = cart

    useEffect(()=>{

    return ()=>{
        dispatch(removeOrderDetails())
    }
},[])
console.log(location.pathname)

const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

const hideYourOrder=(value)=>{
        setHideOrder(true)
}
console.log(hideOrder)
return (
    <div className='checkout__screen'>
        <CheckoutHeader currentLocation={hideOrder? '/order-complete' : location.pathname}/>
        <div className='checkout__screen__content'>
            <div className={hideOrder ? 'expand':'customer__payment__info'}>
                <StripeElement shippingOption={shippingOption} history={history} hideYourOrder={hideYourOrder}/>
            </div>
             <div className={hideOrder? 'shrink':'invoice__info'}>
            <YourOrder
            shippingOption={shippingOption}
            changeShippingOption={(value)=>setShippingOption(value)}
            cartItems={cartItems}
            subTotal={getCartSubTotal()}/>
            </div>
            
            
        </div>
</div>
)
}

export default CheckoutScreen;