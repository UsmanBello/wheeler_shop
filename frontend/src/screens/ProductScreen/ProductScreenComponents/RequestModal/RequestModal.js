import './RequestModal.css'
import { useState, useEffect } from 'react'
import {  isEmptyField, isNumber, acceptedEmail  } from '../../../../utils/helpers'
import Modal  from "react-modal";

//COMPONENT
import Required from '../../../../components/Required/Required'
import Invalid from '../../../../components/Invalid/Invalid'

const RequestModal = ({request, cancel, show}) =>{
    
const [formData, setFormData]= useState({fullName:'', email: '', phone:''})
const [error, setError]=useState({requireName:false, requireEmail: false, RequireNumber: false})

useEffect(()=>{
    setError({requireName:false, requireEmail: false, RequireNumber: false, invalidEmail: false, invalidPhone: false})
},[show])

useEffect(()=>{
    setFormData({fullName:'', email: '', phone: ''})
},[])

const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
      
    e.target.name==='fullName' && setError({...error, requireName: false})
    e.target.name==='email' && setError({...error, requireEmail: false, invalidEmail: false})
    e.target.name==='phone' && setError({...error, requirePhone: false, invalidPhone: false})
}

const handleSubmit=(e)=>{
    e.preventDefault()
    const {fullName, email, phone} = formData
    if (isEmptyField(fullName) || isEmptyField(email) || isEmptyField(phone) ||!acceptedEmail(email) || !isNumber(phone)){
        setError({
            requireName: isEmptyField(fullName),
            requireEmail: isEmptyField(email),
            requirePhone:  isEmptyField(phone),
            invalidEmail: !acceptedEmail(email),
            invalidPhone: !isNumber(phone)
        });
        return;
    }
    request(formData)
}

    return (<Modal 
							isOpen={show}
							onRequestClose={cancel}
							contentLabel="Request Product"
							className="mymodal"
							overlayClassName="myoverlay"
							closeTimeoutMS={100}
							 >
							<div className='request__product'>
                                <div className='request__product__header'>
                                    <h2>Request Product</h2>
                                    <span onClick={()=>cancel()}>X</span>
                                </div>
                                <div className='request__product__form__intro'>
                                    <p>This product is out of stock, but you can make a request and we will get back to you.</p>
                                </div>
                                <div className='request__form__container'>
                                <form className='request__form' onSubmit={(e)=>handleSubmit(e)}>
                                    <div className='request__input__row'>
                                        <label>Full name</label>
                                        <input 
                                        type='text'
                                        name='fullName'
                                        value={formData.fullName}
                                        className={error.requireName ? 'request__input__error':'request__input'}
                                        onChange={(e)=>handleChange(e)}/>
                                        <Required field={"Full name"} display={error.requireName} />
                                    </div>
                                    <div className='request__input__row'>
                                    <label>Email</label>
                                        <input 
                                        type='text'
                                        name='email'
                                        value={formData.email}
                                        className={error.requireEmail || error.invalidEmail ? 'request__input__error':'request__input'}
                                        onChange={(e)=>handleChange(e)}/>
                                        <Required field={"Email"} display={error.requireEmail} />
                                        { !error.requireEmail && <Invalid field={"Email"} display={error.invalidEmail} />}
                                    </div>
                                    <div className='request__input__row'>
                                    <label>Phone Number</label>
                                        <input
                                        type='text'
                                        name='phone'
                                        value={formData.phone}
                                        className={error.requirePhone || error.invalidPhone ? 'request__input__error':'request__input'}
                                        onChange={(e)=>handleChange(e)}/>
                                        <Required field={"Phone number"} display={error.requirePhone} />
                                        {!error.requirePhone && <Invalid field={"Number"} display={error.invalidPhone} />}
                                    </div>
                                    <button type='submit' className='request__form__button'>
                                        Request product
                                    </button>
                                </form>
                                </div>
                            </div>
						  </Modal>
    )
}

export default RequestModal