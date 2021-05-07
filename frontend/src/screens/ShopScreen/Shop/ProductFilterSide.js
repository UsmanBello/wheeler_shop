import './ProductFilterSide.css'
//component
import FilterComponent from './FilterComponent'

const ProductFilterSide =({
  handleSearch, 
  searchInput,
  handleSearchChange,
  handleKeyDown,
  handleBrandChange,
  brandInput,
  handleSubCategorySelected,
  handleMainCategorySelected}) => {

    return (
                 <div className= 'productfilter__side'>
                    <FilterComponent 
                    handleSearch={handleSearch} 
                    handleSearchChange={handleSearchChange}
                    handleKeyDown={handleKeyDown}
                    searchInput={searchInput}
                    handleBrandChange={handleBrandChange}
                    brandInput={brandInput}
                    handleMainCategorySelected={handleMainCategorySelected}
                    handleSubCategorySelected={handleSubCategorySelected}/>
                </div>
    )
  }
  
  export default ProductFilterSide;