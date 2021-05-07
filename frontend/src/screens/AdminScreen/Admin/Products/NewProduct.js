import './NewProduct.css'
import { useState, useCallback } from 'react'
import Modal  from "react-modal";
// import axios from 'axios'
import useData from "../../../../utils/useData"

//COMPONENT
// import MultipleFileInput from './MultipleFilesinput';


Modal.setAppElement("#root");

const NewProduct =({show, create, cancel}) => {
    const {brands, categories} = useData()
    const [previewSources, setPreviewSources]= useState([])
	const [selectedFiles, setSelectedFiles]= useState([]);
	// const [fileName, setFileName]= useState('Choose File');

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
    const [subCategories, setSubCategories] = useState(['---Select Category---'])

    const categoriesOptions= categories.map(category=>category.main)
   
    // RELATED TO FILE UPLOAD
    // const [files, setFiles] = useState([])
     

    const handleChange=(e)=>{
        if(e.target.name==='category'){
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
        
    }
    const previewFiles=(files)=>{
		// setPreviewSources( files.map(file=>{
        //     const reader = new FileReader()
		// reader.readAsDataURL(file)
		
        //     reader.onloadend = ()=>{
        //         return reader.result
        //     }
        // }))
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
       previewFiles(files)

    }
    console.log(previewSources)
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(previewSources.length < 1){//validation of required file input
			console.log('No images uploaded')
			return
		}
        setProduct({
            name: '',
            price:'',
            description: '',
            qty: '',
            brand:'',
            category: '',
            subCategory: '',
            image: '',
            productId:''
        })
    //   var imageUrls= files.map(file=>{return file.url})
        create({...product, images: previewSources})
    }
    // RELATED TO FILE UPLOAD
    // const [files, setFiles] = useState([])
//   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {//bothArray type
//     // Do something with the files
// 	  const mapAccFiles= acceptedFiles.map(file=>({file, errors: []}))
// 	  setFiles((curr)=>[...curr, ...mapAccFiles, ...rejectedFiles])
//   }, [])
  
//   const onUpload=(file, url)=>{
// 	  setFiles(curr=> curr.map(fileWrapper=>{
// 		  if(fileWrapper.file=== file){
// 				return {...fileWrapper, url}  
// 		  }
// 		  return fileWrapper
// 	  }))
//   }
//   const onDelete=(file)=>{
//         axios.delete(file.url)
//         .then(()=>
//         setFiles(curr=> curr.filter(fileWrapper=> fileWrapper.file !== file ))
//         )
//         .catch(err=>console.log(err))
		
//    }
    /*maxSize: 300 * 1024==> 300KB})*/
    // const getSubCategories=()=>{
    //     if(product.category === undefined){
    //         return ['--Select Category--']
    //     }
    //     if(product.category===''){
    //         return ['--Select Category--']
    //     }else{
    //         return categories.filter(category=>categories.main===product.category).subCategories
    //     }
    // }

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
                                                Brand
                                            </label>
                                            <select
                                            className='form__input'
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
                                        </div>
                                       
                                    </div>
                                    <div className='product__form__row'>
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
                                                 {
                                                     categoriesOptions.map((category, index)=>{
                                                         return <option key={index} value={category}>{category.split('_').join(' ')}</option>
                                                     })
                                                 }
                                            </select>
                                        </div>
                                        <div className='product__form__column'>
                                            <label>
                                                Sub Category
                                            </label>
                                            <select value={product.subCategory} 
                                            className='form__input'
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
                                                <div style={{marginTop: '10px'}}>
                                                    <img src={source} width='50px'/>
                                                </div>
                                            })
                                            }
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




///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
// import './NewProduct.css'
// import { useState } from 'react'
// import Modal  from "react-modal";
// import useData from "../../../../utils/useData"

// Modal.setAppElement("#root");

// const NewProduct =({show, create, cancel}) => {
//     const {brands, categories} = useData()
//     const [product, setProduct]= useState({
//         name: '',
//         price:'',
//         description: '',
//         qty: '',
//         brand:'',
//         category: '',
//         subCategory: '',
//         image: '',
//         productId:''
//     })
//     const [subCategories, setSubCategories] = useState(['---Select Category---'])
//     const categoriesOptions= categories.map(category=>category.main)
     

//     const handleChange=(e)=>{
//         if(e.target.name==='category'){
//             if(e.target.value===''){
//                 setSubCategories(['---Select Category---'])
//                 // return
//             }else{
//             setSubCategories(categories.filter(category=> category.main === e.target.value)[0].subCategories)
//             setProduct({...product, [e.target.name]: e.target.value})
//             return
//             }
//         }
//         setProduct({...product, [e.target.name]: e.target.value})
        
//     }
//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         setProduct({
//             name: '',
//             price:'',
//             description: '',
//             qty: '',
//             brand:'',
//             category: '',
//             subCategory: '',
//             image: '',
//             productId:''
//         })
//         create(product)
//     }
//     // const getSubCategories=()=>{
//     //     if(product.category === undefined){
//     //         return ['--Select Category--']
//     //     }
//     //     if(product.category===''){
//     //         return ['--Select Category--']
//     //     }else{
//     //         return categories.filter(category=>categories.main===product.category).subCategories
//     //     }
//     // }

//     return ( 
//         <Modal 
// 							isOpen={show}
// 							onRequestClose={cancel}
// 							contentLabel="Create New Product"
// 							className="mymodal"
// 							overlayClassName="myoverlay"
// 							closeTimeoutMS={100}
// 							 >
// 							<div className='new__products'>
//                                 <div className='create__product__form__header'>
//                                     <h2>Create Product</h2>
//                                     <span onClick={()=>cancel()}>X</span>
//                                 </div>
//                                 <div className='form__Container'>
//                                 <form onSubmit={(e)=>handleSubmit(e)}>
//                                     <div className='product__form__row'>
//                                         <div className='product__form__column'>
//                                             <label>
//                                                 Name
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='name'
//                                                 value={product.name}
//                                                 className='form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                         <div className='product__form__column'>
//                                             <label>
//                                                 Price
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='price'
//                                                 value={product.price}
//                                                 className='form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                     </div>
                                
//                                     <div className='product__form__row'>
//                                         <div className='product__form__column'>
//                                             <label>
//                                                 Quantity
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='qty'
//                                                 value={product.qty}
//                                                 className='form__input'
//                                                 onChange={(e)=>{handleChange(e)}}
//                                             />
//                                         </div>
//                                         <div className='product__form__column'>
//                                             <label>
//                                                 Brand
//                                             </label>
//                                             <select
//                                             className='form__input'
//                                             name='brand'
//                                             type='select'
//                                             onChange={(e)=>{handleChange(e)}}
//                                             value={product.brand}>
//                                                      <option value=''>Select</option>
//                                                  {
//                                                      brands.map((brand, index)=>{
//                                                          return <option key={index} value={brand.name}>{brand.name.split('_').join(' ')}</option>
//                                                      })
//                                                  }
//                                             </select>
//                                         </div>
                                       
//                                     </div>
//                                     <div className='product__form__row'>
//                                     <div className='product__form__column'>
//                                             <label>
//                                                 Category
//                                             </label>
//                                             <select value={product.category} 
//                                             className='form__input'
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
//                                         <div className='product__form__column'>
//                                             <label>
//                                                 Sub Category
//                                             </label>
//                                             <select value={product.subCategory} 
//                                             className='form__input'
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
//                                     <div className='product__form__row'>
//                                         <div className='product__form__column'>
//                                             <label>
//                                                 Product Id
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='productId'
//                                                 value={product.productId}
//                                                 className='form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                         <div className='product__form__column'>
//                                             <label>
//                                                 imageUrl
//                                             </label>
//                                             <input 
//                                                 type='text'
//                                                 name='image'
//                                                 value={product.image}
//                                                 className='form__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                     </div>
//                                     <div className='product__form__row'>
//                                         <div className='product__form__textarea'>
//                                             <label>
//                                                 Description
//                                             </label>
//                                             <textarea
//                                                 type='text'
//                                                 name='description'
//                                                 value={product.description}
//                                                 className='textarea__input'
//                                                 onChange={(e)=>{handleChange(e)}}

//                                             />
//                                         </div>
//                                     </div>
//                                     <div className='add__product__form__button__container'>
//                                     <button type='submit' className='success__button'>
//                                             Create Product
//                                     </button>
//                                     </div>
//                                 </form>
//                                 </div>
//                             </div>
// 						  </Modal>
    
//     )
//   }
  
//   export default NewProduct;