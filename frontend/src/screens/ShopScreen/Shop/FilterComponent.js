import './FilterComponent.css'

//Component
import SearchComponent from '../../../components/Search/SearchComponent';

const FilterComponent =({handleSearch, handleSearchChange, userInput, handleKeyDown}) => {

    return (
                 <div className= 'filter__component'>
                     <div className='product__search__filter'>
                        <SearchComponent
                         handleSearch={handleSearch}
                         handleSearchChange={handleSearchChange}
                         handleKeyDown={handleKeyDown}
                         userInput={userInput}/>
                     </div>
                     <div className='product__brand__filter'>
                         Filter By Brand GOES HERE
                     {/* Brand */}
                     </div>
                     <div className='product__category__filter'>
                         Product Category GOES HERE
                    {/* Category */}
                     </div>
                    
                </div>
    )
  }
  
  export default FilterComponent;