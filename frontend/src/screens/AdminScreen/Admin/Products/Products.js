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
    const { products, productsCount, loading, error} = getProducts
    const { fetchedProducts, count} = products
    //PAGINATE
    const [pageNumber, setPageNumber]= useState(1)
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

    console.log(location)
    useEffect(()=>{
        dispatch(getProductsCount())
      },[dispatch])

    //WHEN QUERY STRING CHANGES, START FROM PAGE 1
    useEffect(()=>{
    var newQueryParams= {
        ...queryParams,
        page: 1
    }
    history.push({
        pathname: '/admin',
        search: queryString.stringify(newQueryParams)
    })
        setPageNumber(1)
    },[queryParams.q, queryParams.brand, queryParams.subCategory])

    useEffect(()=>{
        var sortTerm= extractTerm(queryParams.sort) === '' ? 'latest' : extractTerm(queryParams.sort)
        var searchTerm= extractTerm(queryParams.q)
        var brandFilter= extractTerm(queryParams.brand)
        var categoryFilter= extractTerm(queryParams.category)
        var subCategoryFilter= extractTerm(queryParams.subCategory)
        dispatch(listProducts(searchTerm, brandFilter, categoryFilter, subCategoryFilter,productsPerPage, pageNumber , sortTerm))
    },[dispatch, search, productsPerPage, pageNumber])//search
  
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
      console.log(selected)
      setPageNumber(selected+1)
      var newQueryParams= {
        ...queryParams,
        page:selected+1,
      }
      history.push({
        pathname: '/admin',
        search: queryString.stringify(newQueryParams)
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
    var newQueryParams= {
      ...queryParams,
      q: searchInput
    }
    setSearchInput('')
        history.push({
            pathname: '/admin',
            search: queryString.stringify(newQueryParams)
        })
  }
  
  const handleSearch=()=>{
  
        var newQueryParams= {
          ...queryParams,
          q: searchInput
        }
        setSearchInput('')
        history.push({
            pathname: '/admin',
            search: queryString.stringify(newQueryParams)
        })
      
  }

  const clearSearch=()=>{
    var newQueryParams= {
        ...queryParams,
        q: '',
        brand:'',
        Category:'',
        subCategory:''
      }
      setSearchInput('')
      history.push({
          pathname: '/admin',
          search: queryString.stringify(newQueryParams)
      })
  }
  //====================================================================\\

  //================================== FILTER FUNCTION =====================================\\

  const handleBrandChange=(e)=>{
    setBrandinput(e.target.value)
    var newQueryParams= {
      ...queryParams,
      brand: e.target.value
    }
    history.push({
      pathname: '/admin',
      search: queryString.stringify(newQueryParams)
  })
  }
  const handleCategoryChange=(e)=>{
    setCategoryInput(e.target.value)
    var newQueryParams= {
      ...queryParams,
      category: e.target.value,
      subCategory: ''
    }
    history.push({
      pathname: '/admin',
      search: queryString.stringify(newQueryParams)
  })
  }

  const handleSetRowPerPage=(e)=>{
    console.log(e.target.value)
      setProductsPerPage(e.target.value)
  }
  //===================================================================================\\
  //========================================SORTING FUNCTION ================================\\
const handleSortSelect=(value)=>{
  console.log(value)
  setSortChoice(value)
  var newQueryParams= {
    ...queryParams,
    sort: value
  }
  history.push({
    pathname: '/admin',
    search: queryString.stringify(newQueryParams)
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

                     

                     {count < productsCount &&
                     <div  className='no__results'>
                        <p>{products.count}{" "}{products.count > 1 ? 
                        "results found." : "result found."}{" "}
                        <span className='clear__Search' onClick={()=>{clearSearch()}}>
                            Clear search
                            </span>
                        </p>
                        </div>} 

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
                     </div>
                      
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
