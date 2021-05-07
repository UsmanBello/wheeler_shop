import './CheckoutForm.css'
import{useState, useEffect} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import{ createOrder } from '../../../redux/actions/orderActions'
import { useSelector, useDispatch} from 'react-redux'

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

const CheckoutForm =({success}) =>{

    const dispatch= useDispatch()
    const orderState=useSelector(state=>state.order)
    const {order, loading,  error}= orderState
    const orderError= error

    const stripe=useStripe()
	  const elements= useElements()

    const cart = useSelector( state=> state.cart);
    const { cartItems } = cart
    
    const [items, setItems]= useState([])
    const [transacting, setTransacting]= useState(false)
    const [clicked, setClicked]= useState(false)
    const [customerData, setCustomerData]= useState({
          fullName: '',
          email: '',
          zip: '',
          street: '',
          city: '',
          Country: ''
      })
  // useEffect(()=>{
  //   dispatch(removeOrderDetails())
  // },[])
    useEffect(()=>{
        //WE CAN ALSO CHECK IF ALL ITEMS ARE STILL IN STOCK--- AND CHECK THEM IN BACKEND ASWELL
        setItems(
            cartItems.map(item=>{
                return {product: item.product, qty: item.qty}
            })
        )
    },[cartItems])
    // useEffect(()=>{
    //   if(typeof order==='object' && Object.keys(order).length > 0){
    //     dispatch(emptyCart())
    //   } 
    // },[dispatch, order])
    console.log(order)
    const handleChange=(e)=>{
         setCustomerData({...customerData, [e.target.name]: e.target.value})
    }
  	const handleSubmit= async(e)=>{
          e.preventDefault()
          setClicked(true)
          console.log('submitted')
		const { error, paymentMethod }= await stripe.createPaymentMethod({
			
			type: 'card',
			card: elements.getElement(CardElement)//enter the card info, gotten from cardElement using useElement hook above.
			
		})
		if(!error){
			const { id }= paymentMethod
			console.log(paymentMethod)
			dispatch(createOrder({id, items, customer: customerData}))
      setTransacting(true)
		}
			
	}
	
	
  // const PreviousStyle={maxWidth: '400px', margin: '0px auto'}
	return (
  transacting ? (
    loading ? <h2>Transaction is being processed...</h2> :
        error ? <h2>{orderError}</h2> :
         <p>Purchase Successful. Order Reference No: #-{order._id} . Check your email  {' '}{`${customerData.email}`}{' '} for more detais</p>
  ):
  <form onSubmit={handleSubmit}>
			
			  <div className='checkoutform__row'>
                  <div className='checkoutform__column__double'>
                     <label>Full Name: </label> 
                     <input 
                     className='checkoutform__input'
                     name='fullName'
                     value={customerData.fullName}
                     onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className='checkoutform__column__double'>
                     <label>Email: </label> 
                     <input 
                     className='checkoutform__input'
                     name='email'
                     value={customerData.email}
                     onChange={(e)=>handleChange(e)}/>
                  </div>
              </div>
              <div className='checkoutform__row'>
                  <div className='checkoutform__column__single'>
                     <label>Street Address: </label> 
                     <input 
                     className='checkoutform__input'
                     name='street'
                     value={customerData.street}
                     onChange={(e)=>handleChange(e)}/>
                  </div>
              </div>
              <div className='checkoutform__row'>
                  <div className='checkoutform__column__tripple'>
                     <label>Zip: </label> 
                     <input 
                     className='checkoutform__input'
                     name='zip'
                     value={customerData.zip}
                     onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className='checkoutform__column__tripple'>
                     <label>City: </label> 
                     <input 
                     className='checkoutform__input'
                     name='city'
                     value={customerData.city}
                     onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div className='checkoutform__column__tripple'>
                     <label>Country: </label> 
                     <input 
                     className='checkoutform__input'
                     name='country'
                     value={customerData.country}
                     onChange={(e)=>handleChange(e)}/>
                  </div>
              </div>
		      <CardElement option={CARD_ELEMENT_OPTIONS}/>
				<button type='submit' disabled={!stripe || clicked}>
				PAY 
				</button>
			</form>
      )
}

export default CheckoutForm;