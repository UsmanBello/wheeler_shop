import './SearchComponent.css';
import {useState} from 'react'
const SearchComponent= ({handleSearch, searchInput, handleSearchChange, handleKeyDown}) =>{
 const [inputValue, setInputValue]= useState(searchInput)
//     const handleSearchHere=()=>{
//         setInputValue('')
//         handleSearch()
//     }

 return <div className='search'>
                <input
                className='search__input__bar'
                placeholder='Search'
                value={inputValue}
                onKeyDown={(e)=>handleKeyDown(e)}
                onChange={(e)=>handleSearchChange(e)}/>
                <button className='search__button' onClick={()=>handleSearch()}>
                <i className="fas fa-search" aria-hidden="true"></i>
                </button>
        </div>
}

export default SearchComponent

