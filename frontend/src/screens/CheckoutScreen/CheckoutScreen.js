import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeOrderDetails } from '../../redux/actions/orderActions'
import StripeElement from './Checkout/StripeElement';
import './CheckoutScreen.css'



const CheckoutScreen=()=>{

    const dispatch = useDispatch()
    useEffect(()=>{

    return ()=>{
        dispatch(removeOrderDetails())
    }
},[])

return (<>
<h1>CHECKOUT SCREEN</h1>
<div className='checkout__screen'>
            <StripeElement/>
        </div>
        </>
)
}

export default CheckoutScreen;