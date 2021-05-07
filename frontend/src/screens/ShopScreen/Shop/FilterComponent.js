import './FilterComponent.css';
import useData from '../../../utils/useData';
//Component
import SearchComponent from '../../../components/Search/SearchComponent';


const FilterComponent =({
    click,
    handleSearch, 
    handleSearchChange, 
    userInput, 
    handleKeyDown, 
    brandInput, 
    handleBrandChange,
    handleMainCategorySelected,
    handleSubCategorySelected}) => {


 const { brands, categories }= useData();      

 const handleClicked=(e)=>{
     if(e.target.parentNode.nextSibling.classList.contains("hide__sublist")){
        e.target.parentNode.nextSibling.classList.remove("hide__sublist")
        e.target.classList.add("fa-rotate-180")
     }else{
        e.target.parentNode.nextSibling.classList.add("hide__sublist")
        e.target.classList.remove("fa-rotate-180")
     }
 }

 const handleSearchHere=()=>{
    handleSearch()
    click && click()
 }
 const handleKeyDownHere=(e)=>{
     if(e.keyCode !== 13){
         return
     }
    handleKeyDown(e)
    click && click()
 }
 const handleBrandChangeHere=(e)=>{
    handleBrandChange(e)
    click && click()
 }
 const handleMainCategorySelectedHere=(mainCategory)=>{
    handleMainCategorySelected(mainCategory)
    click && click()
 }
 const handleSubCategorySelectedHere=(mainCategory, subCategory)=>{
    handleSubCategorySelected(mainCategory, subCategory)
    click && click()
 }
    return (
                 <div className= 'filter__component'>
                     <div className='product__search__filter'>
                        <SearchComponent
                         handleSearch={()=>handleSearchHere()}
                         handleSearchChange={handleSearchChange}
                         handleKeyDown={(e)=>handleKeyDownHere(e)}
                         userInput={userInput}/>
                     </div>
                     <div className='product__brand__filter'>
                        <h3>FILTER BY BRAND</h3>
                         <select className='select__input' value={brandInput} onChange={(e)=>handleBrandChangeHere(e)}>
                            <option value=''>Any Brand</option>
                            {
                             brands.map((brand, index)=>{
                                 return <option key={index} value={brand.name}>{brand.name}</option>
                             })}
                         </select>
                     </div>
                     <div className='product__category__filter'>
                        <h3>PRODUCT CATEGORIES</h3> 
                        <ul className='main-list'>{
                            categories.map((category, index)=>{
                          return  <li data-id={category.name} className='main__list__items' key={index}>
                                                <span className='main__list__item__group'>
                                            <span onClick={()=>{handleMainCategorySelectedHere(category.main)}}>{category.main.split('_').join(' ')}</span>
                                            
                                                <i onClick={(e)=>handleClicked(e)} className="fas fa-angle-down" aria-hidden="true"></i>
                                                </span>
                                            <ul className='hide__sublist sub-list'>
                                                {category.subCategories.map((sub, i)=>
                                                        <li className='sub__list__item' key={i}>
                                                            <span onClick={()=>{handleSubCategorySelectedHere(category.main, sub)}}>{sub.split('_').join(' ')}</span>
                                                            </li>
                                                )
                                                }
                                            </ul>
                                    </li>
                            }
                            )}
                            
                        </ul>
                     </div>
                    
                </div>
    )
  }
  
  export default FilterComponent;