import React, {useState, useEffect}       from 'react';
import CheckoutForm            from './CheckoutForm';
import { loadStripe }          from '@stripe/stripe-js';
import { Elements }            from '@stripe/react-stripe-js';

import './StripeElement.css'
// const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_KEY)

const stripePromise=loadStripe("pk_test_51Hk8KzLdtACz1EQM5XzT93wsl8a90mLMAl8EcCsBW02HzmFeeFlitJgX3m90hd13FqECqdJnBjYzpnYrysxp13oB00m3RwoRL0"/*process.env.REACT_APP_STRIPE_KEY*/)

const StripeElement=({shippingOption, history, hideYourOrder})=>{

	return (<Elements stripe={stripePromise}>
			 <CheckoutForm 
			 shippingOption={shippingOption}
			 history={history}
			 hideYourOrder={hideYourOrder}/>
			</Elements>
		)
}

export default StripeElement;