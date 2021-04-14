import './Products.css'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Actions
import { getProducts as listProducts,
    createProduct,
    updateProduct,
    deleteProduct } from '../../../../redux/actions/productActions'

//Component
import ProductItem  from './ProductItem'
import NewProduct from './NewProduct'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'
const Products =() => {
     
    const dispatch= useDispatch()
    const getProducts = useSelector(state=>state.product)
    const { products, loading, error} = getProducts
    
    const [toggleAddProduct, setToggleAddProduct] = useState(false)
    const [toggleEditProduct, setToggleEditProduct]= useState(false)
    const [toggleDeleteProduct, setToggleDeleteProduct]= useState(false)
    const [productToBeActedOn, setProductToBeActedOn]= useState({})

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])

    const addProduct=(product)=>{
        const {name, price, description, qty, category, image, productId}= product
        dispatch(createProduct({name, price, description, countInStock: qty, category, imageUrl: image, productId}))
        setToggleAddProduct(false)
    }
    const editProduct=(product)=>{
        const {_id, name, price, description, qty, category, image, productId}= product
        dispatch(updateProduct({_id, name, price, description, countInStock: qty, category, imageUrl: image, productId}))
        setToggleEditProduct(false)
  
    }
    const handleDeleteProduct=(id)=>{
        dispatch(deleteProduct(id))
        setToggleDeleteProduct(false)
    }
    const handleEditToggle=(product)=>{ 
        setProductToBeActedOn(product)
        setToggleEditProduct(true)

    }
    const handleDeleteToggle=(product)=>{
        setProductToBeActedOn(product)
        setToggleDeleteProduct(true)
    }

    return (
                 <div className='products'>
                     <div className='products__header'>
                            <h2>Products</h2>
                            <button onClick={()=>setToggleAddProduct(true)}>Add Products</button>
                     </div>
                    { loading ? <h2>Loading</h2> : error ? <h2>{error}</h2> :
                    
                     <div className="products__table__container">
                            <table className="products__table" border="0" cellSpacing="0" cellPadding="0"> 
                            <thead>
                                <tr className='table__row'>
                                    <th>#</th>
                                    <th width='20%' className='same'>Name</th>
                                    <th width='10%' className='hide__at__mobile'>Image</th>
                                    <th width='10%' className='same'>Price</th>
                                    <th width='8%' className='same'>Qty</th>
                                    <th className='hide__at__mobile' width='20%'>Brand</th>
                                    <th width='15%' className='same'>Category</th>
                                    <th className='same'>Action</th>
                                 </tr>
                            </thead>
                            <tbody>
                                {
                                   
                                    products.map(product=>{
                                        return <ProductItem 
                                                     key={product._id}
                                                     product={product}
                                                     handleEditToggle={handleEditToggle}
                                                     handleDeleteToggle={handleDeleteToggle}/> 
                                    })
                                }
                            </tbody>
                            </table>
                     </div>
}
                    <NewProduct show={toggleAddProduct}
                                create={addProduct}
                                cancel={()=>setToggleAddProduct(false)}
                                />
                    <EditProduct show={toggleEditProduct}
                                edit={editProduct}
                                cancel={()=>setToggleEditProduct(false)}
                                product={productToBeActedOn}
                                />
                    <DeleteProduct
                                show={toggleDeleteProduct}
                                handleDelete={handleDeleteProduct}
                                cancel={()=>setToggleDeleteProduct(false)}
                                id={productToBeActedOn._id}/>
                </div>
    )
  }
  
  export default Products;
