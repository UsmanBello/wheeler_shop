import './EditProduct.css'
import {useEffect, useState} from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import Modal  from "react-modal";
import useData from "../../../../utils/useData"
import {  isEmptyField, isNumber  } from '../../../../utils/helpers'


//COMPONENTS
import Required from '../../../../components/Required/Required';
import Invalid from '../../../../components/Invalid/Invalid';

Modal.setAppElement("#root");

const EditProduct =({show, edit, cancel,product}) => {

    const {brands, categories} = useData()
    const [formData, setFormData]= useState({
        name: '',
        price: '',
        description: '',
        qty: '',
        sales: 0,
        brand: '',
        category: '',
        subCategory: '',
        image: '',
        productId: ''
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
        invalidQty: false,
        invalidSales: false
    })

    const [subCategories, setSubCategories] = useState(['---Select Category---'])
    const categoriesOptions= categories.map(category=>category.main)
//files
    const [previewSources, setPreviewSources]= useState([])
    const [addedSources, setAddedSources] = useState([])
	// const [selectedFiles, setSelectedFiles]= useState([]);
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
    useEffect(()=>{
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
                qty: product.countInStock,
                sales: product.sales,
                brand: product.brand,
                category: product.category,
                subCategory: product.subCategory,
                image: product.images,
                productId: product.productId
            })
    },[product, show])
    useEffect(()=>{
        setPreviewSources(addedSources)
    },[addedSources])

    const handleChange=(e)=>{
        if(e.target.name==='category'){
            if(e.target.value===''){
                setSubCategories(['---Select Category---'])
               
            }else{
            setSubCategories(categories.filter(category=> category.main === e.target.value)[0].subCategories)
            setFormData({...formData, [e.target.name]: e.target.value})
            return
            }
        }
        setFormData({...formData, [e.target.name]: e.target.value})

        e.target.name === "name" && setError({ ...error, requireName: false });
        e.target.name === "price" && setError({ ...error, requirePrice: false, invalidPrice: false });
        e.target.name === "description" && setError({ ...error, requireDescription: false });
        e.target.name === "qty" && setError({ ...error, requireQty: false, invalidQty: false })
        e.target.name === "brand" && setError({ ...error, requireBrand: false })
        e.target.name === "category" && setError({ ...error, requireCategory: false });
        e.target.name === "subCategory" && setError({ ...error, requireSubcategory: false })
        e.target.name === "productId" && setError({ ...error, requireProductId: false })
        e.target.name=== "sales" && setError({...error, invalidSales: false})
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
            // console.log(sources)
            setAddedSources(sources)
            // setPreviewSources(sources)
        
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
        console.log(formData)
        const {name, price, description, qty, sales, brand, category, subCategory, productId}= formData
        if (
            isEmptyField(name) ||
            isEmptyField(price) ||
            isEmptyField(description) ||
            isEmptyField(qty) ||
            isEmptyField(brand) ||
            isEmptyField(category) ||
            isEmptyField(subCategory) ||
            isEmptyField(productId)||
            !isNumber(price) ||
            !isNumber(qty) ||
            !isNumber(sales) 
          ) {
            setError({
                requireName: isEmptyField(name),
                requirePrice: isEmptyField(price),
                requireDescription: isEmptyField(description),
                requireQty: isEmptyField(qty),
                requireBrand: isEmptyField(brand),
                requireCategory: isEmptyField(category),
                requireSubcategory: isEmptyField(subCategory),
                requireImages: (previewSources.length < 1) && product.images.length===0,
                requireProductId: isEmptyField(productId),
                invalidPrice: !isNumber(price),
                invalidQty: !isNumber(qty),
                invalidSales: !isNumber(sales)
            });
            return;
          }
        previewSources.length >0 ? edit({...formData, _id: product._id, images: previewSources}):
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
                                                className={error.requireName ? 'edit__form__input__error' : 'edit__form__input'}
                                                onChange={(e)=>{handleChange(e)}}
                                            />
                                             <Required field={"Name"} display={error.requireName} />
                                        </div>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Price
                                            </label>
                                            <input 
                                                type='text'
                                                name='price'
                                                value={formData.price}
                                                className={error.requirePrice || error.invalidPrice ? 'edit__form__input__error' : 'edit__form__input'}
                                                onChange={(e)=>{handleChange(e)}}
                                            />
                                             <Required field={"Price"} display={error.requirePrice} />
                                            {!error.requirePrice && <Invalid field={"Price"} display={error.invalidPrice} />}
                                        </div>
                                    </div>
                                    <div className='edit__product__form__row'>
                                        <div className='edit__product__form__column__half'>
                                            <label>
                                                Quantity
                                            </label>
                                            <input 
                                                type='text'
                                                name='qty'
                                                value={formData.qty}
                                                className={error.requireQty || error.invalidQty ? 'edit__form__input__error' : 'edit__form__input'}
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                             <Required field={"Quantity"} display={error.requireQty} />
                                           {!error.requireQty && <Invalid field={"Quantity"} display={error.invalidQty} />}
                                        </div>
                                        <div className='edit__product__form__column__half'>
                                            <label>
                                                Sales (%): 
                                            </label>
                                            <input 
                                                type='text'
                                                name='sales'
                                                value={formData.sales}
                                                className={error.invalidSales ? 'edit__form__input__error' : 'edit__form__input'}
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                             <Invalid field={"Sales"} display={error.invalidSales} />
                                        </div>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Brand
                                            </label>
                                            <select
                                            className={error.requireBrand ? 'edit__form__input__error' : 'edit__form__input'}
                                            name='brand'
                                            type='select'
                                            onChange={(e)=>{handleChange(e)}}
                                            value={formData.brand}>
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
                                    <div className='edit__product__form__row'>
                                    <div className='edit__product__form__column'>
                                            <label>
                                                Category
                                            </label>
                                            <select value={formData.category} 
                                            className={error.requireCategory ? 'edit__form__input__error' : 'edit__form__input'}
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
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Sub Category
                                            </label>
                                            <select value={formData.subCategory} 
                                            className={error.requireSubcategory ? 'edit__form__input__error' : 'edit__form__input'}
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
                                    
                                    <div className='edit__product__form__row'>
                                        <div className='product__form__column'>
                                            <label>
                                                Product Id
                                            </label>
                                            <input 
                                                type='text'
                                                name='productId'
                                                value={formData.productId}
                                                className={error.requireProductId ? 'edit__form__input__error' : 'edit__form__input'}
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                             <Required field={"Product Id"} display={error.requireProductId} />
                                        </div>
                                        <div className='edit__product__form__column'>
                                        <label>
                                                Images
                                            </label>
                                            <input
                                            type='file'
                                            name='images'
                                            onChange={(e)=>handleFileChange(e)}
                                            className={error.requireName ? 'edit__form__input__error' : 'edit__form__input'}
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
                                    <div className='edit__product__form__row'>
                                        <div className='edit__product__form__textarea'>
											<label>Desctiption</label>
                                            <Required field={"Description"} display={error.requireDescription} />
                                           <CKEditor
												  editor={ClassicEditor}
												  data={formData.description}
												  onChange={(event, editor) => {
                                                    setError({...error, requireDescription: false})
													const data = editor.getData()
													setFormData({...formData, description: data})
												  }}
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





/////////////////////////////////////////////////////////////////////////////////////
// import './EditProduct.css'
// import {useEffect, useState} from 'react'
// import Modal  from "react-modal";
// import useData from "../../../../utils/useData"


// Modal.setAppElement("#root");

// const EditProduct =({show, edit, cancel,product}) => {

//     const {brands, categories} = useData()
//     const [formData, setFormData]= useState({
//         name: '',
//         price: '',
//         description: '',
//         qty: '',
//         sales: '',
//         brand: '',
//         category: '',
//         subCategory: '',
//         image: '',
//         productId: ''
//     })

//     const [subCategories, setSubCategories] = useState(['---Select Category---'])
//     const categoriesOptions= categories.map(category=>category.main)

//     useEffect(()=>{
//             setFormData({
//                 name: product.name,
//                 price: product.price,
//                 description: product.description,
//                 qty: product.countInStock,
//                 sales: product.sales,
//                 brand: product.brand,
//                 category: product.category,
//                 subCategory: product.subCategory,
//                 image: product.imageUrl,
//                 productId: product.productId
//             })
//     },[product])

//     const handleChange=(e)=>{
//         if(e.target.name==='category'){
//             if(e.target.value===''){
//                 setSubCategories(['---Select Category---'])
               
//             }else{
//             setSubCategories(categories.filter(category=> category.main === e.target.value)[0].subCategories)
//             setFormData({...formData, [e.target.name]: e.target.value})
//             return
//             }
//         }
//         setFormData({...formData, [e.target.name]: e.target.value})
//     }
//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         edit({...formData, _id: product._id})
//     }
 

//     return ( 
//         <Modal 
// 							isOpen={show}
// 							onRequestClose={cancel}
// 							contentLabel="Edit Product"
// 							className="mymodal"
// 							overlayClassName="myoverlay"
// 							closeTimeoutMS={100}
// 							 >
// 							<div className='edit__products'>
//                                 <div className='edit__product__form__header'>
//                                     <h2>Edit Product</h2>
//                                     <span onClick={()=>cancel()}>X</span>
//                                 </div>
//                                 <div className='edit__form__Container'>
//                                 <form onSubmit={(e)=>handleSubmit(e)}>
//                                     <div className='edit__product__form__row'>
//                                         <div className='edit__product__form__column'>
//                                             <label>
//                                                 Name
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='name'
//                                                 value={formData.name}
//                                                 className='edit__form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                         <div className='edit__product__form__column'>
//                                             <label>
//                                                 Price
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='price'
//                                                 value={formData.price}
//                                                 className='edit__form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                     </div>
//                                     <div className='edit__product__form__row'>
//                                         <div className='edit__product__form__column__half'>
//                                             <label>
//                                                 Quantity
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='qty'
//                                                 value={formData.qty}
//                                                 className='edit__form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                         <div className='edit__product__form__column__half'>
//                                             <label>
//                                                 Sales (%): 
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='sales'
//                                                 value={formData.sales}
//                                                 className='edit__form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                         <div className='edit__product__form__column'>
//                                             <label>
//                                                 Brand
//                                             </label>
//                                             <select
//                                             className='edit__form__input'
//                                             name='brand'
//                                             type='select'
//                                             onChange={(e)=>{handleChange(e)}}
//                                             value={formData.brand}>
//                                                      <option value=''>Select</option>
//                                                  {
//                                                      brands.map((brand, index)=>{
//                                                          return <option key={index} value={brand.name}>{brand.name.split('_').join(' ')}</option>
//                                                      })
//                                                  }
//                                             </select>
//                                         </div>
                                       
//                                     </div>
//                                     <div className='edit__product__form__row'>
//                                     <div className='edit__product__form__column'>
//                                             <label>
//                                                 Category
//                                             </label>
//                                             <select value={formData.category} 
//                                             className='edit__form__input'
//                                             name='category'
//                                              onChange={(e)=>handleChange(e)}
//                                              type='select'>
//                                                  <option value=''>Select</option>
//                                                  {
//                                                      categoriesOptions.map((category, index)=>{
//                                                          return <option key={index} value={category}>{category.split('_').join(' ')}</option>
//                                                      })
//                                                  }
//                                             </select>
//                                         </div>
//                                         <div className='edit__product__form__column'>
//                                             <label>
//                                                 Sub Category
//                                             </label>
//                                             <select value={formData.subCategory} 
//                                             className='edit__form__input'
//                                             name='subCategory'
//                                              onChange={(e)=>handleChange(e)}
//                                              type='select'>
//                                                 <option value=''>Select</option>
//                                                 {
//                                                     subCategories.map((category, index)=>{
//                                                         return <option key={index} value={category}>{category.split('_').join(' ')}</option>
//                                                     })

//                                                 }
//                                             </select>
//                                         </div>
//                                     </div>
                                    
//                                     <div className='edit__product__form__row'>
//                                         <div className='product__form__column'>
//                                             <label>
//                                                 Product Id
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='productId'
//                                                 value={formData.productId}
//                                                 className='edit__form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                         <div className='edit__product__form__column'>
//                                             <label>
//                                                 imageUrl
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='image'
//                                                 value={formData.image}
//                                                 className='edit__form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                     </div>
//                                     <div className='edit__product__form__row'>
//                                         <div className='edit__product__form__textarea'>
//                                             <label>
//                                                 Description
//                                             </label>
//                                             <textarea
//                                                 type='text'
//                                                 name='description'
//                                                 value={formData.description}
//                                                 className='edit__textarea__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                     </div>
//                                     <div className='edit__product__form__button__container'>
//                                     <button type='submit' className='success__button'>
//                                             Update Product
//                                     </button>
//                                     </div>
//                                 </form>
//                                 </div>
//                             </div>
// 						  </Modal>
    
//     )
//   }
  
//   export default EditProduct;
{/*} <label>
                                                Description
                                            </label>
                                            <textarea
                                                type='text'
                                                name='description'
                                                value={formData.description}
                                                className='edit__textarea__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            /> */}