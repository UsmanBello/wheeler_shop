import FilterComponent from './FilterComponent';
import './ProductFilterMobile.css'

const ProductFilterMobile =({
  click,
   show,
   handleSearch,
   searchInput,
   handleSearchChange,
   handleKeyDown,
    brandInput, 
   handleBrandChange,
   handleMainCategorySelected,
   handleSubCategorySelected}) => {

  const sideDrawerClass = ["products__sidedrawer"];

  if (show) {
    sideDrawerClass.push("show");
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <div className='mobile__filter__container'>
      <FilterComponent 
      click={click}
       handleSearch={handleSearch}
       searchInput={searchInput}
        handleSearchChange={handleSearchChange}
        handleKeyDown={handleKeyDown}
        brandInput={brandInput}
        handleBrandChange={handleBrandChange}
        handleMainCategorySelected={handleMainCategorySelected}
        handleSubCategorySelected={handleSubCategorySelected}/>
      </div>
    </div>
  );
  }
  
  export default ProductFilterMobile;
 
  

