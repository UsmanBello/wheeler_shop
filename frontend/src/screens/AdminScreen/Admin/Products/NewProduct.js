import './NewProduct.css'
import { useState, useEffect } from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import Modal  from "react-modal";
import {  isEmptyField, isNumber  } from '../../../../utils/helpers'

// import { acceptedEmail, isEmptyField, isNumber } from '../../../../utils/helpers'
// import axios from 'axios'
import useData from "../../../../utils/useData"

//COMPONENT
//COMPONENTS
import Required from '../../../../components/Required/Required';
import Invalid from '../../../../components/Invalid/Invalid';


Modal.setAppElement("#root");

const NewProduct =({show, create, cancel}) => {
    const {brands, categories} = useData()
    const [previewSources, setPreviewSources]= useState([])
	const [selectedFiles, setSelectedFiles]= useState([]);
	// const [fileName, setFileName]= useState('Choose File');
useEffect(()=>{
    setError({
        requireName: false,
        requirePrice: false,
        requireDescription: false,
        requireQty: false,
        requireBrand: false,
        requireCategory: false,
        requireSubcategory: false,
        requireImages: false,
        requireProductId: false,
        invalidPrice: false,
        invalidQty: false
    })
},[show])
    const [product, setProduct]= useState({
        name: '',
        price:'',
        description: '',
        qty: '',
        brand:'',
        category: '',
        subCategory: '',
        images: [],
        productId:''
    })
    const [error, setError]= useState({
        requireName: false,
        requirePrice: false,
        requireDescription: false,
        requireQty: false,
        requireBrand: false,
        requireCategory: false,
        requireSubcategory: false,
        requireImages: false,
        requireProductId: false,
        invalidPrice: false,
        invalidQty: false
    })
    const [subCategories, setSubCategories] = useState(['---Select Category---'])

    const categoriesOptions= categories.map(category=>category.main)

    useEffect(()=>{
            setProduct({
                name: '',
                price:'',
                description: '',
                qty: '',
                brand:'',
                category: '',
                subCategory: '',
                images: [],
                productId:''
            })
            setPreviewSources([])
    },[show])
   
    // RELATED TO FILE UPLOAD
    // const [files, setFiles] = useState([])
     

    const handleChange=(e)=>{
        if(e.target.name==='category'){
            e.target.name === "category" && setError({ ...error, requireCategory: false });
        
            if(e.target.value===''){
                setSubCategories(['---Select Category---'])
                // return
            }else{
            setSubCategories(categories.filter(category=> category.main === e.target.value)[0].subCategories)
            setProduct({...product, [e.target.name]: e.target.value})
            return
            }
           
        }
        setProduct({...product, [e.target.name]: e.target.value})

        e.target.name === "name" && setError({ ...error, requireName: false });
        e.target.name === "price" && setError({ ...error, requirePrice: false, invalidPrice: false });
        e.target.name === "description" && setError({ ...error, requireDescription: false });
        e.target.name === "qty" && setError({ ...error, requireQty: false, invalidQty: false })
        e.target.name === "brand" && setError({ ...error, requireBrand: false })
        e.target.name === "subCategory" && setError({ ...error, requireSubcategory: false });
        e.target.name === "productId" && setError({ ...error, requireProductId: false })
    }
    const previewFiles=(files)=>{
        let sources=[]
        files.forEach(file=>{
            const reader = new FileReader()
            reader.readAsDataURL(file)
            
                reader.onloadend = ()=>{
                     sources.push(reader.result)
                }
            })
            console.log(sources)
            setPreviewSources(sources)

	}
    const handleFileChange=(e)=>{
        var files = []
         console.log(e.target.files.length)
         for(var i =0; i< e.target.files.length; i++){
            files.push(e.target.files[i])
         }
         e.target.name === "images" && setError({ ...error, requireImages: false })
       previewFiles(files)

    }
   
    const handleSubmit=(e)=>{
        e.preventDefault()
        const {name, price, description, qty, brand, category, subCategory, productId}= product
        if (
            isEmptyField(name) ||
            isEmptyField(price) ||
            isEmptyField(description) ||
            isEmptyField(qty) ||
            isEmptyField(brand) ||
            isEmptyField(category) ||
            isEmptyField(subCategory) ||
            isEmptyField(productId) ||
            !isNumber(price) ||
            !isNumber(qty)

          ) {
            setError({
                requireName: isEmptyField(name),
                requirePrice: isEmptyField(price),
                requireDescription:  isEmptyField(description),
                requireQty: isEmptyField(qty),
                requireBrand: isEmptyField(brand),
                requireCategory: isEmptyField(category),
                requireSubcategory: isEmptyField(subCategory),
                requireImages: (previewSources.length < 1),
                requireProductId: isEmptyField(productId),
                invalidPrice: !isNumber(price),
                invalidQty: !isNumber(qty)
            });
            return;
          }

        setProduct({
            name: '',
            price:'',
            description: '',
            qty: '',
            brand:'',
            category: '',
            subCategory: '',
            images: [],
            productId:''
        })
       
        create({...product, images: previewSources})
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
                                                className={error.requireName ? 'form__input__error': 'form__input'}
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                            <Required field={"Name"} display={error.requireName} />
                                        </div>
                                        <div className='product__form__column'>
                                            <label>
                                                Price
                                            </label>
                                            <input 
                                                type='text'
                                                name='price'
                                                value={product.price}
                                                className={error.requirePrice || error.invalidPrice ?  'form__input__error' : 'form__input'}
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                            <Required field={"Price"} display={error.requirePrice} />
                                           {!error.requirePrice && <Invalid field={"Price"} display={error.invalidPrice} />}
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
                                                className={error.requireQty || error.invalidQty ?  'form__input__error' : 'form__input'}
                                                onChange={(e)=>{handleChange(e)}}
                                            />
                                            <Required field={"Quantity"} display={error.requireQty} />
                                           {!error.requireQty && <Invalid field={"Quantity"} display={error.invalidQty===true} />}
                                        </div>
                                        <div className='product__form__column'>
                                            <label>
                                                Brand
                                            </label>
                                            <select
                                            className={error.requireBrand  ?  'form__input__error' : 'form__input'}
                                            name='brand'
                                            type='select'
                                            onChange={(e)=>{handleChange(e)}}
                                            value={product.brand}>
                                                     <option value=''>Select</option>
                                                 {
                                                     brands.map((brand, index)=>{
                                                         return <option key={index} value={brand.name}>{brand.name.split('_').join(' ')}</option>
                                                     })
                                                 }
                                            </select>
                                            <Required field={"Brand"} display={error.requireBrand} />
                                        </div>
                                       
                                    </div>
                                    <div className='product__form__row'>
                                    <div className='product__form__column'>
                                            <label>
                                                Category
                                            </label>
                                            <select value={product.category} 
                                            className={error.requireCategory ?  'form__input__error' : 'form__input'}
                                            name='category'
                                             onChange={(e)=>handleChange(e)}
                                             type='select'>
                                                 <option value=''>Select</option>
                                                 {
                                                     categoriesOptions.map((category, index)=>{
                                                         return <option key={index} value={category}>{category.split('_').join(' ')}</option>
                                                     })
                                                 }
                                            </select>
                                            <Required field={"Category"} display={error.requireCategory} />
                                        </div>
                                        <div className='product__form__column'>
                                            <label>
                                                Sub Category
                                            </label>
                                            <select value={product.subCategory} 
                                            className={error.requireSubcategory ?  'form__input__error' : 'form__input'}
                                            name='subCategory'
                                             onChange={(e)=>handleChange(e)}
                                             type='select'>
                                                <option value=''>Select</option>
                                                {
                                                    subCategories.map((category, index)=>{
                                                        return <option key={index} value={category}>{category.split('_').join(' ')}</option>
                                                    })

                                                }
                                            </select>
                                            <Required field={"Sub Category"} display={error.requireSubcategory} />
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
                                                className={error.requireProductId ?  'form__input__error' : 'form__input'}
                                                onChange={(e)=>{handleChange(e)}}
                                            />
                                             <Required field={"Product Id"} display={error.requireProductId} />
                                        </div>
                                        <div className='product__form__column'>
                                            <label>
                                                Images
                                            </label>
                                            <input
                                            type='file'
                                            name='images'
                                            onChange={(e)=>handleFileChange(e)}
                                            className={error.requireImages  ?  'form__input__error' : 'form__input'}
                                            multiple/>
                                             <Required field={"Images"} display={error.requireImages} />
                                            {previewSources && 
                                            previewSources.map(source=>{
                                               return <div style={{marginTop: '10px'}}>
                                                    <img src={source} width='50px'/>
                                                </div>
                                            })
                                            }
                                        </div>
                                    </div>
                                    <div className='product__form__row'>
                                        <div className='product__form__textarea'>
                                        
											<label>Desctiption</label>
                                            <Required field={"Description"} display={error.requireDescription} />
                                           <CKEditor
												  editor={ClassicEditor}
												  data={product.description}
												  onChange={(event, editor) => {
                                                    setError({...error, requireDescription: false})
													const data = editor.getData()
													setProduct({...product, description: data})
												  }}
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