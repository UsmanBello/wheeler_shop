
import{useState} from 'react';
import './YourOrder.css'

const YourOrder=({shippingOption, changeShippingOption, subTotal, cartItems})=>{
var items=[{name: 'product name', qty:'2', subtotal:'500'},
{name: 'product name2', qty:'3', subtotal:'600'},
{name: 'product name3', qty:'4', subtotal:'700'}]
const total=500
// const [formData, setFormData]= useState({shipping: 'flatRate'})

    return(
         <div className='yourorder__container'>
            <div className='yourorder__header'>
                <h3>YOUR ORDER</h3>
            </div>
            <div className='purchase__summary'>
                <div className='purchase__summary__header'>
                    <p>PRODUCT</p>
                    <p>SUBTOTAL</p>
                </div>
                <div className='purchase__summary__items'>
                       {cartItems.map(item=>{
                           return<div className='purchased__item' key={item.product}>
                                    <div className='summary__left item'>
                                        <p>{item.name}<span>{' '}x {item.qty}</span></p>
                                    </div>
                                    <div className='summary__right price'>
                                        <p>AED {item.price}.00</p>
                                    </div>
                                </div>
                       })}
                </div>
                <div className='billing__calculation'>
                    <div className='subtotal'>
                        <p className='subtotal__left'>Subtotal</p>
                        <p className='subtotal__right'>AED {subTotal}</p>
                    </div>
                    <div className='shipping'>
                        <p className='shipping__left'>Shipping</p>
                        <div className='shipping__right'>
                            <div className='shipping__option'>
                                <label htmlFor={'flatRate'} className='radio'>
                                    <input
                                        id='flatRate'
                                        className='radio__input'
                                        type='radio'
                                        value='flatRate'
                                        checked={shippingOption === 'flatRate'}
                                        onChange={(e)=>changeShippingOption(e.target.value)}
                                    />{' '}
                                 Flat rate: AED 60.00
                                </label>
                            </div>
                            <div className='shipping__option'>
                            <label htmlFor={'localPickup'} className='radio'>
                                    <input
                                        id='localPickup'
                                        className='radio__input'
                                        type='radio'
                                        value='localPickup'
                                        checked={shippingOption === "localPickup"}
                                        onChange={(e)=>changeShippingOption(e.target.value)}
                                    />{' '}
                                 Local pickup
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='total'>
                        <div className='total__left'>
                            <p>Total</p>
                        </div>
                        <div className='total__right'>
                            {shippingOption==='flatRate' && <p>AED {(Number(subTotal)+60)+'.00'}</p>}
                            {shippingOption==='localPickup' && <p>AED {subTotal}</p>}

                        </div>
                    </div>
                </div>
            </div>
            <div className='temrs'>
                <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
            </div>
         </div>
         )

}

export default YourOrder
