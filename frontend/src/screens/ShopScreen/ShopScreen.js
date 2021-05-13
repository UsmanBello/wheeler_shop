import './ShopScreen.css';
import {useState, useEffect} from 'react'
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
// import Paginate from 'rc-pagination';

import { extractTerm } from '../../utils/helpers'
import { useSelector, useDispatch } from 'react-redux'

//Components 
import Product from '../../components/Product/Product';
import ProductFilterSide from './Shop/ProductFilterSide';
import ProductFilterMobile from './Shop/ProductFilterMobile';
import Backdrop from '../../components/Backdrop/Backdrop'

//Actions 
import { getProducts, getProductsCount}from '../../redux/actions/productActions';
import SelectRowsPerPage from '../../components/SelectInput/SelectRowsPerPage';
import SelectSort from '../../components/SelectInput/SelectSort';

const  ShopScreen=({click, location, history})=> {

  //PAGINATE
  const [pageNumber, setPageNumber]= useState(1)
  const [productsPerPage, setProductsPerPage]=useState(15)

  const { search }  = location
  const queryParams = queryString.parse(search)
  const dispatch = useDispatch()
  const productsState = useSelector( state => state.product)
  const { loading, error, products, productsCount } = productsState;
  const {fetchedProducts, count} = products
  const [searchInput, setSearchInput]= useState('')
  const [brandInput, setBrandinput] = useState('')
  const [sortChoice, setSortChoice] = useState('latest')
  const [sideToggle, setSideToggle]=useState(false)
  
useEffect(()=>{
  dispatch(getProductsCount())
},[dispatch])

useEffect(()=>{
  var newQueryParams= {
    ...queryParams,
    page: 1
  }
  history.push({
    pathname: '/shop',
    search: queryString.stringify(newQueryParams)
})
     setPageNumber(1)
},[queryParams.q, queryParams.brand, queryParams.subCategory])

useEffect(()=>{
   var sortTerm= extractTerm(queryParams.sort)===''? 'latest' : extractTerm(queryParams.sort)
   var searchTerm= extractTerm(queryParams.q)
   var brandFilter= extractTerm(queryParams.brand)
   var categoryFilter= extractTerm(queryParams.category)
   var subCategoryFilter= extractTerm(queryParams.subCategory)
 
  dispatch(getProducts(searchTerm, brandFilter, categoryFilter, subCategoryFilter, productsPerPage, pageNumber, sortTerm))

},[dispatch, search, pageNumber, productsPerPage]) 
console.log(fetchedProducts)

//TO Helper function
var pageCount= Math.ceil(products.count/productsPerPage)


//================================ PAGINATION FUNCTION ================================\\
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
    pathname: '/shop',
    search: queryString.stringify(newQueryParams)
})
}

const handleSetRowPerPage =(e)=>{
    setProductsPerPage(e.target.value)
}
//========================================================================================\\

//================================ SEARCH & FILTER FUNCTIONS================================\\
const handleSearchChange=(e)=>{
      setSearchInput(e.target.value)
}
const handleBrandChange=(e)=>{
  setBrandinput(e.target.value)
  var newQueryParams= {
    ...queryParams,
    brand: e.target.value
  }
  history.push({
    pathname: '/shop',
    search: queryString.stringify(newQueryParams)
})
}

const handleKeyDown=(e)=>{
  
  var newQueryParams= {
    ...queryParams,
    q: searchInput
  }
  setSearchInput('')
      history.push({
          pathname: '/shop',
          search: queryString.stringify(newQueryParams)
      })
}

const handleSearch=()=>{

  setSearchInput('')
      var newQueryParams= {
        ...queryParams,
        q: searchInput
      }
      
      history.push({
          pathname: '/shop',
          search: queryString.stringify(newQueryParams)
      })
    
}
const handleMainCategorySelected=(categoryName)=>{
  var newQueryParams= {
    ...queryParams,
    category: categoryName,
    subCategory: ''
  }
  delete newQueryParams.subCategory
  history.push({
    pathname: '/shop',
    search:  queryString.stringify(newQueryParams)
})
}

const handleSubCategorySelected=(categoryName , subCategoryName)=>{
  console.log(categoryName)
  var newQueryParams= {
    ...queryParams,
    category: '',
    subCategory: subCategoryName
  }
  delete newQueryParams.category
  history.push({
    pathname: '/shop',
    search: queryString.stringify(newQueryParams)
})
}
//========================================================================================\\

//========================================SORTING FUNCTION ================================\\
const handleSortSelect=(value)=>{
  console.log(value)
  setSortChoice(value)
  var newQueryParams= {
    ...queryParams,
    sort: value
  }
  history.push({
    pathname: '/shop',
    search: queryString.stringify(newQueryParams)
})
}
//==========================================================================================\\


  return (
    <div className='shopscreen'>
      <div className='shopscreen__left'>
        <ProductFilterSide 
        handleSearch={handleSearch}
         searchInput={searchInput}
          handleSearchChange={handleSearchChange}
          handleKeyDown={handleKeyDown}
          brandInput={brandInput}
          handleBrandChange={handleBrandChange}
          handleMainCategorySelected={handleMainCategorySelected}
          handleSubCategorySelected={handleSubCategorySelected}
          />
      </div>
      <div className='shopscreen__right'>
        <div className='shopscreen__right__header'>
        <h2 className='shopscreen__title' onClick={()=>setSideToggle(true)}> 
        <span className='shopscreen__title__hide'>Filter<i className="fas fa-filter" aria-hidden="true"></i></span>
        </h2>
        <div className='sort-container'>
          <div className='sort__container'>
            <SelectSort sortChoice={sortChoice} handleSortSelect={handleSortSelect}/>
          </div>
          <div className='rows__perpage__container'>
           <SelectRowsPerPage rowsPerPage={productsPerPage} handleSetRowPerPage={handleSetRowPerPage}/>
           </div>
		    </div>
        </div>
    {count < productsCount &&
           <p>{count}{" "}{count > 1 ? 
           "results found." : "result found."}{" "}
           <span className='clear__Search' onClick={()=>{history.push({pathname:'/shop', search: ''})}}>
             Clear search
             </span>
           </p>} 
        <div className='shopscreen__products'>
          {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> :
          
          <>
         {
            products.fetchedProducts.map(product=>{
              return <Product 
              key={product._id}
              name={product.name}
              snippet={product.snippet}
              price={product.price}
              image={product.images[0].image}
              productId={product._id}/>
               })}
               </>
          }
        </div>
        {products.count > productsPerPage  &&
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
    </div>
    <ProductFilterMobile 
    show={sideToggle} 
    click={()=>setSideToggle(false)}
    handleSearch={handleSearch}
    searchInput={searchInput}
     handleSearchChange={handleSearchChange}
     handleKeyDown={handleKeyDown}
     brandInput={brandInput}
     handleBrandChange={handleBrandChange}
     handleMainCategorySelected={handleMainCategorySelected}
     handleSubCategorySelected={handleSubCategorySelected}/>
    <Backdrop show={sideToggle} click={()=>setSideToggle(false)}/>
    </div>
  );
}

export default ShopScreen;

