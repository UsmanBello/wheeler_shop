import './ProductFilterSide.css'
//component
import FilterComponent from './FilterComponent'

const ProductFilterSide =({handleSearch, searchInput, handleSearchChange, handleKeyDown}) => {

    return (
                 <div className= 'productfilter__side'>
                    <FilterComponent 
                    handleSearch={handleSearch} 
                    handleSearchChange={handleSearchChange}
                    handleKeyDown={handleKeyDown}
                    searchInput={searchInput}/>
                </div>
    )
  }
  
  export default ProductFilterSide;