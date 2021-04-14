import './EditProduct.css'
import {useEffect, useState} from 'react'
import Modal  from "react-modal";


Modal.setAppElement("#root");

const EditProduct =({show, edit, cancel,product}) => {
    
    const [formData, setFormData]= useState({
        name: '',
        price: '',
        description: '',
        qty: '',
        category: '',
        image: '',
        productId: ''
    })
    useEffect(()=>{
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
                qty: product.countInStock,
                category: product.category,
                image: product.imageUrl,
                productId: product.productId
            })
    },[product])

    const handleChange=(e)=>{
            setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        edit({...formData, _id: product._id})
    }


    return ( 
        <Modal 
							isOpen={show}
							onRequestClose={cancel}
							contentLabel="Edit Product"
							className="mymodal"
							overlayClassName="myoverlay"
							closeTimeoutMS={100}
							 >
							<div className='edit__products'>
                                <div className='edit__product__form__header'>
                                    <h2>Edit Product</h2>
                                    <span onClick={()=>cancel()}>X</span>
                                </div>
                                <div className='edit__form__Container'>
                                <form onSubmit={(e)=>handleSubmit(e)}>
                                    <div className='edit__product__form__row'>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Name
                                            </label>
                                            <input 
                                                type='text'
                                                name='name'
                                                value={formData.name}
                                                className='edit__form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Price
                                            </label>
                                            <input 
                                                type='text'
                                                name='price'
                                                value={formData.price}
                                                className='edit__form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                    </div>
                                    <div className='edit__product__form__row'>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Quantity
                                            </label>
                                            <input 
                                                type='text'
                                                name='qty'
                                                value={formData.qty}
                                                className='edit__form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Category
                                            </label>
                                            <select value={formData.category} 
                                            className='edit__form__input'
                                            name='category'
                                             onChange={(e)=>handleChange(e)}
                                             type='select'>
                                                <option value=''>Select</option>
                                                <option value='body and exterior'>Body & Exterior</option>
                                                <option value='camping'>Camping</option>
                                                <option value='engine'>Engine</option>
                                                <option value='equipment'>Equipment</option>
                                                <option value='interior'>Interior</option>
                                                <option value='lighting'>Lighting</option>
                                                <option value='power'>Power</option>
                                                <option value='recovery'>Recovery</option>
                                                <option value='suspension'>Suspension</option>
                                                <option value='wheels'>Wheels</option> 
                                            </select>
                                        </div>
                                    </div>
                                    <div className='edit__product__form__row'>
                                        <div className='product__form__column'>
                                            <label>
                                                Product Id
                                            </label>
                                            <input 
                                                type='text'
                                                name='productId'
                                                value={formData.productId}
                                                className='edit__form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                imageUrl
                                            </label>
                                            <input 
                                                type='text'
                                                name='image'
                                                value={formData.image}
                                                className='edit__form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                    </div>
                                    <div className='edit__product__form__row'>
                                        <div className='edit__product__form__textarea'>
                                            <label>
                                                Description
                                            </label>
                                            <textarea
                                                type='text'
                                                name='description'
                                                value={formData.description}
                                                className='edit__textarea__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                    </div>
                                    <div className='edit__product__form__button__container'>
                                    <button type='submit' className='success__button'>
                                            Update Product
                                    </button>
                                    </div>
                                </form>
                                </div>
                            </div>
						  </Modal>
    
    )
  }
  
  export default EditProduct;