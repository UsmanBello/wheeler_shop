import './ShopScreen.css';
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Components 
import Product from '../../components/Product/Product';
import ProductFilterSide from './Shop/ProductFilterSide'
import ProductFilterMobile from './Shop/ProductFilterMobile'

//Actions 
import { getProducts }from '../../redux/actions/productActions';


const  ShopScreen=({click})=> {

  const dispatch = useDispatch()
  const productsState = useSelector( state => state.product)
  const { loading, error, products } = productsState;
  const [searchInput, setSearchInput]= useState('')
  const [searchResult, setSearchResult]= useState([])
  const [searchOnClick, setSearchOnClick] = useState('')
  
	const [sort, setSort]=useState('Sort by')

useEffect(()=>{
  dispatch(getProducts())
},[dispatch])

//.................SEARCH LOGIC IN PROGRESS...........\\
// useEffect(()=>{
//   setSearchResult(
//     products.filter(product=> {
//       return product.name.toLowerCase().indexOf(searchOnClick.toLowerCase() !== -1)
//     })
//   )
  
// },[dispatch, searchOnClick, products])

const handleSearchChange=(e)=>{
      setSearchInput(e.target.value)
}
const handleKeyDown=(e)=>{
  if(e.keyCode !== 13){
    return 
  }
  console.log('enter typed')
  setSearchOnClick(searchInput)
  setSearchInput('')
}
const handleSearch=( )=>{
      setSearchOnClick(searchInput)
      setSearchInput('')
    
}


//Sorting
const setSortByfunction=(e)=>{
  var value=e.target.value
  if(value==='ascending'){
    setSearchResult(
    products.sort((a,b)=>{return Number(a.price) - Number(b.price)}))
    setSort(value)
  }else if(value==='descending'){
    setSearchResult(
    products.sort((a,b)=>{return Number(b.price) - Number(a.price)}))
    setSort(value)
  }else if(value==='sales'){
    setSearchResult(
    products.sort((a,b)=>{return Number(b.discount) - Number(a.discount)}))
    setSort(value)
  }
}
 
  return (
    <div className='shopscreen'>
      <div className='shopscreen__left'>
        <ProductFilterSide 
        handleSearch={handleSearch}
         searchInput={searchInput}
          handleSearchChange={handleSearchChange}
          handleKeyDown={handleKeyDown}
          />
        <ProductFilterMobile/>
      </div>
      <div className='shopscreen__right'>
        <h2 className='shopscreen__title'>Lattes Products</h2>
        <div className='sort-container'>

					<select id="sort-by" name="sort-by" 
						value={sort} onChange={(e)=>setSortByfunction(e)}>
						<option value={'Sort by'}>Sort by </option>
						<option value={'ascending'}>Low to High</option>
						<option value={'descending'}>High to Low</option>
						<option value={'sales'}>sales</option>
		 			</select>
			
		</div>
        <div className='shopscreen__products'>
          {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> :  searchResult.map(product=>{
              return <Product 
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}/>
            })
          }
        </div>
    </div>
    </div>
  );
}

export default ShopScreen;

