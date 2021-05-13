import './EditProduct.css'
import {useEffect, useState} from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import {CKEditor} from "@ckeditor/ckeditor5-react"
import Modal  from "react-modal";
import useData from "../../../../utils/useData"


Modal.setAppElement("#root");

const EditProduct =({show, edit, cancel,product}) => {

    const {brands, categories} = useData()
    const [formData, setFormData]= useState({
        name: '',
        price: '',
        description: '',
        qty: '',
        sales: '',
        brand: '',
        category: '',
        subCategory: '',
        image: '',
        productId: ''
    })

    const [subCategories, setSubCategories] = useState(['---Select Category---'])
    const categoriesOptions= categories.map(category=>category.main)
//files
    const [previewSources, setPreviewSources]= useState([])
    const [addedSources, setAddedSources] = useState([])
	// const [selectedFiles, setSelectedFiles]= useState([]);

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
    },[product])
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
      previewFiles(files)

    }
    const handleSubmit=(e)=>{
        e.preventDefault()
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
                                        <div className='edit__product__form__column__half'>
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
                                        <div className='edit__product__form__column__half'>
                                            <label>
                                                Sales (%): 
                                            </label>
                                            <input 
                                                type='text'
                                                name='sales'
                                                value={formData.sales}
                                                className='edit__form__input'
                                                onChange={(e)=>{handleChange(e)}}

                                            />
                                        </div>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Brand
                                            </label>
                                            <select
                                            className='edit__form__input'
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
                                        </div>
                                       
                                    </div>
                                    <div className='edit__product__form__row'>
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
                                                 {
                                                     categoriesOptions.map((category, index)=>{
                                                         return <option key={index} value={category}>{category.split('_').join(' ')}</option>
                                                     })
                                                 }
                                            </select>
                                        </div>
                                        <div className='edit__product__form__column'>
                                            <label>
                                                Sub Category
                                            </label>
                                            <select value={formData.subCategory} 
                                            className='edit__form__input'
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
                                                Images
                                            </label>
                                            <input
                                            type='file'
                                            name='images'
                                            onChange={(e)=>handleFileChange(e)}
                                            className='form__input'
                                            multiple/>
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
                                           <CKEditor
												  editor={ClassicEditor}
												  data={formData.description}
												  onChange={(event, editor) => {
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