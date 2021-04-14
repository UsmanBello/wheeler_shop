import './NewProduct.css'
import {useState} from 'react'
import Modal  from "react-modal";


Modal.setAppElement("#root");

const NewProduct =({show, create, cancel}) => {
    
    const [product, setProduct]= useState({
        name: '',
        price:'',
        description: '',
        qty: '',
        category: '',
        image: '',
        productId:''
    })

    const handleChange=(e)=>{
        
            setProduct({...product, [e.target.name]: e.target.value})
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setProduct({
            name: '',
            price:'',
            description: '',
            qty: '',
            category: '',
            image: '',
            productId:''
        })
        create(product)
    }


    return ( 
        <Modal 
							isOpen={show}
							onRequestClose={cancel}
							contentLabel="Create New Product"
							className="mymodal"
							overlayClassName="myoverlay"
							closeTimeoutMS={100}
							 >
							<div className='new__products'>
                                <div className='create__product__form__header'>
                                    <h2>Create Product</h2>
                                    <span onClick={()=>cancel()}>X</span>
                                </div>
                                <div className='form__Container'>
                                <form onSubmit={(e)=>handleSubmit(e)}>
                                    <div className='product__form__row'>
                                        <div className='product__form__column'>
                                            <label>
                                                Name
                                            </label>
                                            <input 
                                                type='text'
                                                name='name'
                                                value={product.name}
                                                className='form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                        <div className='product__form__column'>
                                            <label>
                                                Price
                                            </label>
                                            <input 
                                                type='text'
                                                name='price'
                                                value={product.price}
                                                className='form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                    </div>
                                    <div className='product__form__row'>
                                        <div className='product__form__column'>
                                            <label>
                                                Quantity
                                            </label>
                                            <input 
                                                type='text'
                                                name='qty'
                                                value={product.qty}
                                                className='form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                        <div className='product__form__column'>
                                            <label>
                                                Category
                                            </label>
                                            <select value={product.category} 
                                            className='form__input'
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
                                    <div className='product__form__row'>
                                        <div className='product__form__column'>
                                            <label>
                                                Product Id
                                            </label>
                                            <input 
                                                type='text'
                                                name='productId'
                                                value={product.productId}
                                                className='form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                        <div className='product__form__column'>
                                            <label>
                                                imageUrl
                                            </label>
                                            <input 
                                                type='text'
                                                name='image'
                                                value={product.image}
                                                className='form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                    </div>
                                    <div className='product__form__row'>
                                        <div className='product__form__textarea'>
                                            <label>
                                                Description
                                            </label>
                                            <textarea
                                                type='text'
                                                name='description'
                                                value={product.description}
                                                className='textarea__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                    </div>
                                    <div className='add__product__form__button__container'>
                                    <button type='submit' className='success__button'>
                                            Create Product
                                    </button>
                                    </div>
                                </form>
                                </div>
                            </div>
						  </Modal>
    
    )
  }
  
  export default NewProduct;