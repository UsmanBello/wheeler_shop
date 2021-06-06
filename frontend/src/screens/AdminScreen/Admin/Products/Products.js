import './Products.css';
import {useEffect, useState} from 'react';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { extractTerm } from '../../../../utils/helpers';


//Actions
import { getProducts as listProducts,
    getProductsCount,
    createProduct,
    updateProduct,
    deleteProduct } from '../../../../redux/actions/productActions';

//Component
import ProductItem  from './ProductItem';
import NewProduct from './NewProduct';
import EditProduct from './EditProduct';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import SearchComponent from '../../../../components/Search/SearchComponent';
import AdminProductsFilter from './AdminProductsFilter';

const Products =({location, history}) => {

    const { search }  = location
    const queryParams = queryString.parse(search)

    
    const dispatch= useDispatch()
    const getProducts = useSelector(state=>state.product)
    // const { products, productsCount, loading, error} = getProducts
    const { products, productsCount, loadingProducts, loadingProductsCount, error} = getProducts

    const { fetchedProducts, count} = products
    
    //PAGINATE
    const [pageNumber, setPageNumber]= useState(queryParams.page ? Number(queryParams.page) : 1)
    const [productsPerPage, setProductsPerPage]=useState(15)

    //OTHER
    const [searchInput, setSearchInput]= useState('')
    const [brandInput, setBrandinput] = useState('')
    const [categoryInput, setCategoryInput] = useState('')
    const [toggleAddProduct, setToggleAddProduct] = useState(false)
    const [toggleEditProduct, setToggleEditProduct]= useState(false)
    const [toggleDeleteProduct, setToggleDeleteProduct]= useState(false)
    const [productToBeActedOn, setProductToBeActedOn]= useState({})
    const [sortChoice, setSortChoice] = useState('latest')
    // console.log('From Query- '+queryParams.page +' \n From state- '+pageNumber)
    console.log(queryParams)
  
    useEffect(()=>{
      setPageNumber(queryParams.page ? Number(queryParams.page) : 1)
    },[queryParams.page])
    useEffect(()=>{
        var sortTerm= extractTerm(queryParams.sort) === '' ? 'latest' : extractTerm(queryParams.sort)
        var searchTerm= extractTerm(queryParams.q)
        var brandFilter= extractTerm(queryParams.brand)
        var categoryFilter= extractTerm(queryParams.category)
        var subCategoryFilter= extractTerm(queryParams.subCategory)
        var outOfStock=extractTerm(queryParams.outOfStock)
        dispatch(listProducts(searchTerm, brandFilter, categoryFilter, subCategoryFilter,productsPerPage, pageNumber , sortTerm, outOfStock))
    },[dispatch, search, productsPerPage, pageNumber])//search
    useEffect(()=>{
      dispatch(getProductsCount())
    },[dispatch])
    //TO Helper function
    var pageCount= Math.ceil(count/productsPerPage)

    //==========PAGINATION FUNCTIONS=======/
    const getCurrentPage=()=>{
        if(extractTerm(queryParams.page) !==''){
            return Number(extractTerm(queryParams.page))-1
        }else{
          return pageNumber-1
    
      }
    }
    const changePage =({selected})=>{ 
      setPageNumber(selected+1)
      
      history.push({
        pathname: '/admin',
        search: queryString.stringify({ ...queryParams, page:selected+1})
    })
    }
    //======================================//

    //==================== CRUD FUNCTIONS FOR PRODUCT ====================//
    const addProduct=(product)=>{
        const {name, price, description, qty, brand, category, subCategory, images, productId}= product
        dispatch(createProduct({name, price, description, countInStock: qty, brand, category, subCategory, images, productId}))
        setToggleAddProduct(false)
    }
    const editProduct=(product)=>{
        const {_id, name, price, description, qty,sales, brand, category, subCategory, images, productId}= product
        dispatch(updateProduct({_id, name, price, description, countInStock: qty, sales, brand,  category, subCategory, images, productId, latestUpdate: new Date()}))
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
  //================================================================================//

//============================== SEARCH FUNCTION ======================//

    const handleSearchChange=(e)=>{
        setSearchInput(e.target.value)
    }
    const handleKeyDown=(e)=>{
        if(e.keyCode !== 13){
        return 
    }
    setSearchInput('')
    delete queryParams.outOfStock
        history.push({
            pathname: '/admin',
            search: queryString.stringify({...queryParams, q: searchInput,page: 1})
        })
  }
  
  const handleSearch=()=>{
        setSearchInput('')
        delete queryParams.outOfStock
        history.push({
            pathname: '/admin',
            search: queryString.stringify({...queryParams, q: searchInput, page: 1 })
        })
      
  }

  const clearSearch=()=>{
      setSearchInput('')
      history.push({
          pathname: '/admin',
          search: queryString.stringify({admin_option: 'products'})
      })
  }
  //====================================================================\\

  //================================== FILTER FUNCTION =====================================\\

  const handleBrandChange=(value)=>{
    setBrandinput(value)
    delete queryParams.outOfStock
    history.push({
      pathname: '/admin',
      search: queryString.stringify({ ...queryParams, brand: value, page: 1})
  })
  }
  const handleCategoryChange=(value)=>{
    setCategoryInput(value)
    // var newQueryParams= {
    //   ...queryParams,
    //   category: e.target.value,
    //   // subCategory: '',
    //   page: 1
    // }
    delete queryParams.outOfStock
    history.push({
      pathname: '/admin',
      search: queryString.stringify({ ...queryParams, category: value, /* subCategory: '',*/ page: 1})
  })
  }

  const handleSetRowPerPage=(value)=>{
      setProductsPerPage(value)
  }
  //===================================================================================\\
  //========================================SORTING FUNCTION ================================\\
const handleSortSelect=(value)=>{
  setSortChoice(value)
  history.push({
    pathname: '/admin',
    search: queryString.stringify({ ...queryParams, sort: value, page: 1 })
})
}
//==========================================================================================\\
    return (
                 <div className='products'>
                     <div className='products__header'>
                            <button className='add__button'onClick={()=>setToggleAddProduct(true)}>Add Products</button>
                            <div className='search__container'>
                                    <SearchComponent
                                        handleSearch={handleSearch}
                                        handleSearchChange={handleSearchChange}
                                        handleKeyDown={handleKeyDown}
                                        userInput={searchInput}/>
                            </div>
                           
                     </div>
                     <div className='admin__products__filter'>
                       <AdminProductsFilter 
                       handleBrandChange={handleBrandChange}
                       brandInput={brandInput}
                       handleCategoryChange={handleCategoryChange}
                       categoryInput={categoryInput}
                       handleSetRowPerPage={handleSetRowPerPage}
                       rowsPerPage={productsPerPage}
                       sortChoice={sortChoice}
                       handleSortSelect={handleSortSelect}/>
                     </div>

                     { loadingProducts && loadingProductsCount ? <h2>Loading</h2> : error ? <h2>{error}</h2> :
                    <>
                    <div className="products__table__container">
                     

                     {count < productsCount &&
                     <div  className='no__results'>
                        <p>{products.count}{" "}{products.count > 1 ? 
                        "results found." : "result found."}{" "}
                        <span className='clear__Search' onClick={()=>clearSearch()}>
                            Clear search
                            </span>
                        </p>
                        </div>} 

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
                                    fetchedProducts.map(product=>{
                                        return <ProductItem 
                                                     key={product._id}
                                                     product={product}
                                                     handleEditToggle={handleEditToggle}
                                                     handleDeleteToggle={handleDeleteToggle}/> 
                                    })
                                }
                            </tbody>
                            </table>
                     </div></>
                      
}
{count > productsPerPage  &&
<div className='page__component__container'>
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        forcePage={getCurrentPage()}
                        containerClassName={"pagination__btns"}
                        previousLinkClassName={"previous__btn"}
                        nextClassName={"next__btn"}
                        activeClassName={"pagination__active"}/>
                      </div>}
                    <NewProduct show={toggleAddProduct}
                                create={addProduct}
                                cancel={()=>setToggleAddProduct(false)}
                                />
                    <EditProduct show={toggleEditProduct}
                                edit={editProduct}
                                cancel={()=>setToggleEditProduct(false)}
                                product={productToBeActedOn}
                                />
                    <DeleteModal
                                show={toggleDeleteProduct}
                                handleDelete={handleDeleteProduct}
                                cancel={()=>setToggleDeleteProduct(false)}
                                id={productToBeActedOn._id}
                                toDelete={'product'}/>
                </div>
    )
  }
  
  export default Products;
