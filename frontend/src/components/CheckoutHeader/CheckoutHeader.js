
import { Link } from 'react-router-dom';
import './CheckoutHeader.css'


const CheckoutHeader=({currentLocation})=>{
    console.log(currentLocation)
   return (
   <div className='checkout__screen__header'>
        <p>
            <Link className={currentLocation==='/cart' ? 'current__checkout__link pointable' :'pointable'} to={'/cart'}>
                SHOPPING CART
                </Link>
            {' '}&#62;{' '}
            <Link className={currentLocation==='/checkout' ? 'current__checkout__link pointable' :'pointable'} to={'/checkout'}>
                CHECKOUT DETAILS
                </Link>
            {' '}&#62;{' '}
            <span className={currentLocation==='/order-complete' ? 'current__checkout__link pointable' :'pointable'}>ORDER COMPLETE</span>
        </p>
    </div>)
}

export default CheckoutHeader