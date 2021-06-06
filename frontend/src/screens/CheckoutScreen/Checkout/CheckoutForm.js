
import './CheckoutForm.css'
import{useState, useEffect} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import{ createOrder } from '../../../redux/actions/orderActions'
import { useSelector, useDispatch} from 'react-redux'
import { acceptedEmail, isNumber, isEmptyField  } from '../../../utils/helpers';

//COMPONENTS
import Required from '../../../components/Required/Required'
import Invalid from '../../../components/Invalid/Invalid'


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

const CheckoutForm =({success, shippingOption, history, hideYourOrder}) =>{

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
    const [acceptTerms, setAcceptTerms]= useState(false)
    const [paymentOption, setPaymentOption]= useState({card: true, cod: false})
      const [customerData, setCustomerData]= useState({
        firstName: '',
        lastName: '',
        email:'',
        phone: '',
        street: '',
        city: '',
        country: ''
    })
    const [err, setErr]=useState({
       requireFirstName: false,
       requireLastName: false,
       requireEmail: false,
       requirePhone: false,
       requireStreet: false,
       requireCity: false,
       requireCountry: false,
       invalidEmail: false,
       invalidPhone: false,
       unacceptedTerms: false
    })
  useEffect(()=>{
     if(transacting===true){
         hideYourOrder()
     }
  },[transacting, hideYourOrder])
    useEffect(()=>{
        //WE CAN ALSO CHECK IF ALL ITEMS ARE STILL IN STOCK--- AND CHECK THEM IN BACKEND ASWELL
        setItems(
            cartItems.map(item=>{
                return {product: item.product, qty: item.qty}
            })
        )
    },[cartItems])
    
    const handleChange=(e)=>{
         setCustomerData({...customerData, [e.target.name]: e.target.value})
         e.target.name=== "firstName" && setErr({...err, requireFirstName: false})
         e.target.name=== "lastName" && setErr({...err, requireLastName: false})
         e.target.name=== "email" && setErr({...err, requireEmail: false, invalidEmail: false})
         e.target.name=== "phone" && setErr({...err, requirePhone: false, invalidPhone: false})
         e.target.name=== "city" && setErr({...err, requireCity: false})
         e.target.name=== "street" && setErr({...err, requireStreet: false})
         e.target.name=== "country" && setErr({...err, requireCountry: false})

    }

    const handleTermsSelect=(e)=> {
      e.target.name=== "acceptTerm" && setErr({...err, unacceptedTerms: false})
      setAcceptTerms(!acceptTerms)
    }

  	const handleSubmit= async(e)=>{
      //   try{
          e.preventDefault()
          const {firstName, lastName, email, phone, city, street, country}= customerData
          if(
             isEmptyField(firstName) ||
             isEmptyField(lastName) ||
             isEmptyField(email) ||
             isEmptyField(phone) ||
             isEmptyField(city) ||
             isEmptyField(street) ||
             isEmptyField(country) ||
             !acceptedEmail(email) ||
             !isNumber(phone) ||
             acceptTerms === false
          ){
             setErr({
               requireFirstName: isEmptyField(firstName),
               requireLastName: isEmptyField(lastName),
               requireEmail: isEmptyField(email),
               requirePhone: isEmptyField(phone),
               requireStreet: isEmptyField(street),
               requireCity: isEmptyField(city),
               requireCountry: isEmptyField(country),
               invalidEmail: !acceptedEmail(email),
               invalidPhone: !isNumber(phone),
               unacceptedTerms: !acceptTerms
             })
             
             return
          }
          
          setClicked(!clicked)
          
          if(paymentOption.card===true){
		const { error, paymentMethod }= await stripe.createPaymentMethod({
			
			type: 'card',
			card: elements.getElement(CardElement)//enter the card info, gotten from cardElement using useElement hook above.
			
		})
		if(!error){
			const { id }= paymentMethod
			console.log(paymentMethod)
         console.log({id, items, customer: customerData, shipping: shippingOption, payemnet: 'card'})
			dispatch(createOrder({id, items, customer: customerData, shipping: shippingOption, payment: 'card'}))
         setTransacting(true)
		}
   }else if(paymentOption.cod===true){
      console.log({items, customer: customerData, shipping: shippingOption, payment: 'cash'})
             dispatch(createOrder({items, customer: customerData, shipping: shippingOption, payment: 'cash'}))
             setTransacting(true)
   }
// }catch(err){
//    console.log(err)
// }	
	}
	
	
  // const PreviousStyle={maxWidth: '400px', margin: '0px auto'}
	return (
  transacting ? (
    loading ? <h2  className='transaction__message'>Transaction is being processed...</h2> : error ? <h2  className='transaction__message'>{orderError}</h2> :
       <p className='transaction__message'>Purchase Successful. Order Reference No: #-{order.invoiceNo} . Check your email {customerData.email} for more detais</p>
   //   loading ?  <h2>Transaction is being processed...</h2> : error ? getMessage({status:'failure', message: error}) : getMessage({status:'success', message:`Purchase Successful. Order Reference No: #-${order.invoiceNo} . Check your email  ${customerData.email} for more detais`})
  ):(
  <form onSubmit={handleSubmit} className={clicked ? 'overlay__loading__background':''}>
     
        <div className= 'form__header'>
		     	<h3>BILLING DETAILS</h3>
        </div>
			  <div className='checkoutform__row'>
                <div className='checkoutform__column__double'>
                     <label>First name <span>&#42;</span> </label> 
                     <input 
                     className={err.requireFirstName ? 'checkoutform__input__error':'checkoutform__input'}
                     name='firstName'
                     value={customerData.firstName}
                     onChange={(e)=>handleChange(e)}/>
                     <Required field={"First name"} display={err.requireFirstName} />
                  </div>
                  
                  <div className='checkoutform__column__double' id='remove__extra__margin'>
                     <label>Last name <span>&#42;</span></label> 
                     <input 
                     className={err.requireLastName ? 'checkoutform__input__error':'checkoutform__input'}
                     name='lastName'
                     value={customerData.lastName}
                     onChange={(e)=>handleChange(e)}/>
                     <Required field={"Last name"} display={err.requireLastName} />
                  </div>
              </div>
              <div className='checkoutform__row'>
                  <div className='checkoutform__column__single'>
                     <label>Country <span>&#42;</span></label> 
                     <select 
                     className={err.requireCountry ? 'checkoutform__input__error':'checkoutform__input'}
                     name='country'
                     value={customerData.country}
                     onChange={(e)=>handleChange(e)}>
                     <option value=''></option>
                     <option value='Oman'>Oman</option>
                     <option value='United Arab Emirates'>United Arab Emirates</option>
                  </select>
                  <Required field={"Country"} display={err.requireCountry} />
                  </div>
              </div>
              <div className='checkoutform__row'>
              <div className='checkoutform__column__single'>
                     <label>Street address <span>&#42;</span></label> 
                     <input 
                     className={err.requireStreet ? 'checkoutform__input__error':'checkoutform__input'}
                     name='street'
                     value={customerData.street}
                     onChange={(e)=>handleChange(e)}/>
                     <Required field={"Street"} display={err.requireStreet} />
                  </div>
              </div>
              <div className='checkoutform__row'>
              <div className='checkoutform__column__single'>
                     <label>Town/City <span>&#42;</span></label> 
                     <input 
                     className={err.requireCity ? 'checkoutform__input__error':'checkoutform__input'}
                     name='city'
                     value={customerData.city}
                     onChange={(e)=>handleChange(e)}/>
                     <Required field={"City"} display={err.requireCity} />
                  </div>
              </div>
              <div className='checkoutform__row'>
              <div className='checkoutform__column__single'>
                     <label>Phone <span>&#42;</span></label> 
                     <input 
                     className={err.requirePhone || err.invalidPhone ? 'checkoutform__input__error':'checkoutform__input'}
                     name='phone'
                     value={customerData.phone}
                     onChange={(e)=>handleChange(e)}/>
                     <Required field={"Number"} display={err.requirePhone} />
                     {!err.requirePhone && <Invalid field={"Number"} display={err.invalidPhone} />}
                  </div>
              </div>
              <div className='checkoutform__row'>
              <div className='checkoutform__column__single'>
                     <label>Email <span>&#42;</span></label> 
                     <input 
                     className={err.requireEmail || err.invalidEmail ? 'checkoutform__input__error':'checkoutform__input'}
                     name='email'
                     value={customerData.email}
                     onChange={(e)=>handleChange(e)}/>
                     <Invalid field={"Email"} display={err.requireEmail} />
                    { !err.requireEmail && <Invalid field={"Email"} display={err.invalidEmail} />}

                  </div>
              </div>
              <div className='checkoutform__row'>
                  <div className={paymentOption.card ? 'chosen__payment__option' : 'payment__option'} 
                       onClick={()=>setPaymentOption({card: true, cod: false})}>
                     <i className="fa fa-credit-card-alt" aria-hidden="true"/>{' '}
                     Pay by card 
                  </div>
                  <div className={paymentOption.cod ? 'chosen__payment__option' : 'payment__option'}
                       onClick={()=>setPaymentOption({card: false, cod: true})}>

                    <i className="fa fa-money" aria-hidden="true"/>{' '}
                    Cash on delivery
                  </div>
              </div>
              {paymentOption.card &&
              <>
		      <CardElement option={CARD_ELEMENT_OPTIONS}/>
            <div className='checkoutform__row accept__terms'>
               <label>
               <input
                type='checkbox'
                name='acceptTerm'
                value={acceptTerms}
                onChange={(e)=>handleTermsSelect(e)}
               />{' '}
                I have read and agree to the website terms and conditions <span>&#42;</span>
               </label>
              
            </div>
            <Required field={"Terms and conditions"} display={err.unacceptedTerms} />
				<button type='submit' disabled={!stripe || clicked} className={clicked?'disabled__payment__button' :'payment__button'}>
				{clicked ? 'please wait...': 'Place order'}
				</button>
            </>
            }
            {paymentOption.cod &&
              <>
            <div className='checkoutform__row accept__terms'>
               <label>
               <input
                type='checkbox'
                name='acceptTerm'
                value={acceptTerms}
                onChange={(e)=>handleTermsSelect(e)}
               />{' '}
                I have read and agree to the website terms and conditions <span>&#42;</span>
               </label>
               <Required field={"Terms and conditions"} display={err.unacceptedTerms} />
            </div>

				<button type='submit' disabled={clicked} className={clicked?'disabled__payment__button' :'payment__button'}>
				{clicked ? 'please wait...': 'Place order'}
				</button>
            </>
            }
			</form>
      
)
      )
}

export default CheckoutForm;



// import './CheckoutForm.css'
// import{useState, useEffect} from 'react'
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import{ createOrder } from '../../../redux/actions/orderActions'
// import { useSelector, useDispatch} from 'react-redux'
// import { acceptedEmail, isNumber, isEmptyField  } from '../../../utils/helpers';

// //COMPONENTS
// import Required from '../../../components/Required/Required'
// import Invalid from '../../../components/Invalid/Invalid'
// import { set } from 'mongoose';


// const CARD_ELEMENT_OPTIONS = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#aab7c4",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//   };

// const CheckoutForm =({ shippingOption, hideYourOrder}) =>{

//     const dispatch= useDispatch()
//     const orderState=useSelector(state=>state.order)
//     const {order, loading,  error}= orderState
//     const orderError= error

//     const stripe=useStripe()
// 	  const elements= useElements()

//     const cart = useSelector( state=> state.cart);
//     const { cartItems } = cart
    
//     const [items, setItems]= useState([])
//     const [transacting, setTransacting]= useState(false)
//     const [complete, setComplete]= useState(false)
//     const [acceptTerms, setAcceptTerms]= useState(false)
//     const [paymentOption, setPaymentOption]= useState({card: true, cod: false})
//       const [customerData, setCustomerData]= useState({
//         firstName: '',
//         lastName: '',
//         email:'',
//         phone: '',
//         street: '',
//         city: '',
//         country: ''
//     })
//     const [err, setErr]=useState({
//        requireFirstName: false,
//        requireLastName: false,
//        requireEmail: false,
//        requirePhone: false,
//        requireStreet: false,
//        requireCity: false,
//        requireCountry: false,
//        invalidEmail: false,
//        invalidPhone: false,
//        unacceptedTerms: false
//     })
//    // useEffect(()=>{
//    //    if(transacting && (order || error)){
//    //       console.log('came in check useEffect')
//    //       handleComplete(order, error, customerData.email)
//    // }
//    // },[orderState, transacting])
//   useEffect(()=>{
//      if(transacting===true){
//       console.log('came in hideOrder')

//          hideYourOrder()
//      }
//   },[transacting, hideYourOrder])
//     useEffect(()=>{
//         //WE CAN ALSO CHECK IF ALL ITEMS ARE STILL IN STOCK--- AND CHECK THEM IN BACKEND ASWELL
//         setItems(
//             cartItems.map(item=>{
//                 return {product: item.product, qty: item.qty}
//             })
//         )
//     },[cartItems])
//     const handleComplete=(order, error, email)=>{
// 		if(!loading && (order||error)){	
//             setComplete(true)
//       }
// 	}
//     const handleChange=(e)=>{
//          setCustomerData({...customerData, [e.target.name]: e.target.value})
//          e.target.name=== "firstName" && setErr({...err, requireFirstName: false})
//          e.target.name=== "lastName" && setErr({...err, requireLastName: false})
//          e.target.name=== "email" && setErr({...err, requireEmail: false, invalidEmail: false})
//          e.target.name=== "phone" && setErr({...err, requirePhone: false, invalidPhone: false})
//          e.target.name=== "city" && setErr({...err, requireCity: false})
//          e.target.name=== "street" && setErr({...err, requireStreet: false})
//          e.target.name=== "country" && setErr({...err, requireCountry: false})

//     }

//     const handleTermsSelect=(e)=> {
//       e.target.name=== "acceptTerm" && setErr({...err, unacceptedTerms: false})
//       setAcceptTerms(!acceptTerms)
//     }

//   	const handleSubmit= async(e)=>{
//       //   try{
//           e.preventDefault()
//           const {firstName, lastName, email, phone, city, street, country}= customerData
//           if(
//              isEmptyField(firstName) ||
//              isEmptyField(lastName) ||
//              isEmptyField(email) ||
//              isEmptyField(phone) ||
//              isEmptyField(city) ||
//              isEmptyField(street) ||
//              isEmptyField(country) ||
//              !acceptedEmail(email) ||
//              !isNumber(phone) ||
//              acceptTerms === false
//           ){
//              setErr({
//                requireFirstName: isEmptyField(firstName),
//                requireLastName: isEmptyField(lastName),
//                requireEmail: isEmptyField(email),
//                requirePhone: isEmptyField(phone),
//                requireStreet: isEmptyField(street),
//                requireCity: isEmptyField(city),
//                requireCountry: isEmptyField(country),
//                invalidEmail: !acceptedEmail(email),
//                invalidPhone: !isNumber(phone),
//                unacceptedTerms: !acceptTerms
//              })
             
//              return
//           }
//           setTransacting(true)
//           if(paymentOption.card===true){
// 		const { error, paymentMethod }= await stripe.createPaymentMethod({
			
// 			type: 'card',
// 			card: elements.getElement(CardElement)//enter the card info, gotten from cardElement using useElement hook above.
			
// 		})
// 		if(!error){
// 			const { id }= paymentMethod
// 			console.log(paymentMethod)
//          console.log({id, items, customer: customerData, shipping: shippingOption, payemnet: 'card'})
// 			dispatch(createOrder({id, items, customer: customerData, shipping: shippingOption, payment: 'card'}))
// 		}
//    }else if(paymentOption.cod===true){
//       console.log({items, customer: customerData, shipping: shippingOption, payment: 'cash'})
//              dispatch(createOrder({items, customer: customerData, shipping: shippingOption, payment: 'cash'}))
//             //  setTransacting(true)
//    }
//    handleComplete(order, error, customerData.email)
	
// 	}
	
	
//   // const PreviousStyle={maxWidth: '400px', margin: '0px auto'}
// 	return (
//   transacting ? (complete ? error?<h2>{err}</h2>:<p>{order.invoiceNo}{', '}{customerData.email}</p>:
//   <h2  className='transaction__message'>Transaction is being processed...</h2>):(
//   <form onSubmit={handleSubmit}>
     
//         <div className= 'form__header'>
// 		     	<h3>BILLING DETAILS</h3>
//         </div>
// 			  <div className='checkoutform__row'>
//                 <div className='checkoutform__column__double'>
//                      <label>First name <span>&#42;</span> </label> 
//                      <input 
//                      className={err.requireFirstName ? 'checkoutform__input__error':'checkoutform__input'}
//                      name='firstName'
//                      value={customerData.firstName}
//                      onChange={(e)=>handleChange(e)}/>
//                      <Required field={"First name"} display={err.requireFirstName} />
//                   </div>
                  
//                   <div className='checkoutform__column__double' id='remove__extra__margin'>
//                      <label>Last name <span>&#42;</span></label> 
//                      <input 
//                      className={err.requireLastName ? 'checkoutform__input__error':'checkoutform__input'}
//                      name='lastName'
//                      value={customerData.lastName}
//                      onChange={(e)=>handleChange(e)}/>
//                      <Required field={"Last name"} display={err.requireLastName} />
//                   </div>
//               </div>
//               <div className='checkoutform__row'>
//                   <div className='checkoutform__column__single'>
//                      <label>Country <span>&#42;</span></label> 
//                      <select 
//                      className={err.requireCountry ? 'checkoutform__input__error':'checkoutform__input'}
//                      name='country'
//                      value={customerData.country}
//                      onChange={(e)=>handleChange(e)}>
//                      <option value=''></option>
//                      <option value='Oman'>Oman</option>
//                      <option value='United Arab Emirates'>United Arab Emirates</option>
//                   </select>
//                   <Required field={"Country"} display={err.requireCountry} />
//                   </div>
//               </div>
//               <div className='checkoutform__row'>
//               <div className='checkoutform__column__single'>
//                      <label>Street address <span>&#42;</span></label> 
//                      <input 
//                      className={err.requireStreet ? 'checkoutform__input__error':'checkoutform__input'}
//                      name='street'
//                      value={customerData.street}
//                      onChange={(e)=>handleChange(e)}/>
//                      <Required field={"Street"} display={err.requireStreet} />
//                   </div>
//               </div>
//               <div className='checkoutform__row'>
//               <div className='checkoutform__column__single'>
//                      <label>Town/City <span>&#42;</span></label> 
//                      <input 
//                      className={err.requireCity ? 'checkoutform__input__error':'checkoutform__input'}
//                      name='city'
//                      value={customerData.city}
//                      onChange={(e)=>handleChange(e)}/>
//                      <Required field={"City"} display={err.requireCity} />
//                   </div>
//               </div>
//               <div className='checkoutform__row'>
//               <div className='checkoutform__column__single'>
//                      <label>Phone <span>&#42;</span></label> 
//                      <input 
//                      className={err.requirePhone || err.invalidPhone ? 'checkoutform__input__error':'checkoutform__input'}
//                      name='phone'
//                      value={customerData.phone}
//                      onChange={(e)=>handleChange(e)}/>
//                      <Required field={"Number"} display={err.requirePhone} />
//                      {!err.requirePhone && <Invalid field={"Number"} display={err.invalidPhone} />}
//                   </div>
//               </div>
//               <div className='checkoutform__row'>
//               <div className='checkoutform__column__single'>
//                      <label>Email <span>&#42;</span></label> 
//                      <input 
//                      className={err.requireEmail || err.invalidEmail ? 'checkoutform__input__error':'checkoutform__input'}
//                      name='email'
//                      value={customerData.email}
//                      onChange={(e)=>handleChange(e)}/>
//                      <Invalid field={"Email"} display={err.requireEmail} />
//                     { !err.requireEmail && <Invalid field={"Email"} display={err.invalidEmail} />}

//                   </div>
//               </div>
//               <div className='checkoutform__row'>
//                   <div className={paymentOption.card ? 'chosen__payment__option' : 'payment__option'} 
//                        onClick={()=>setPaymentOption({card: true, cod: false})}>
//                      <i className="fa fa-credit-card-alt" aria-hidden="true"/>{' '}
//                      Pay by card 
//                   </div>
//                   <div className={paymentOption.cod ? 'chosen__payment__option' : 'payment__option'}
//                        onClick={()=>setPaymentOption({card: false, cod: true})}>

//                     <i className="fa fa-money" aria-hidden="true"/>{' '}
//                     Cash on delivery
//                   </div>
//               </div>
//               {paymentOption.card &&
//               <>
// 		      <CardElement option={CARD_ELEMENT_OPTIONS}/>
//             <div className='checkoutform__row accept__terms'>
//                <label>
//                <input
//                 type='checkbox'
//                 name='acceptTerm'
//                 value={acceptTerms}
//                 onChange={(e)=>handleTermsSelect(e)}
//                />{' '}
//                 I have read and agree to the website terms and conditions <span>&#42;</span>
//                </label>
              
//             </div>
//             <Required field={"Terms and conditions"} display={err.unacceptedTerms} />
// 				<button type='submit' disabled={!stripe || transacting} className='payment__button'>
// 				{transacting ? 'loading...': 'Place order'}
// 				</button>
//             </>
//             }
//             {paymentOption.cod &&
//               <>
//             <div className='checkoutform__row accept__terms'>
//                <label>
//                <input
//                 type='checkbox'
//                 name='acceptTerm'
//                 value={acceptTerms}
//                 onChange={(e)=>handleTermsSelect(e)}
//                />{' '}
//                 I have read and agree to the website terms and conditions <span>&#42;</span>
//                </label>
//                <Required field={"Terms and conditions"} display={err.unacceptedTerms} />
//             </div>

// 				<button type='submit' className='payment__button'>
// 				Place order 
// 				</button>
//             </>
//             }
// 			</form>
      
// )
//       )
// }

// export default CheckoutForm;

