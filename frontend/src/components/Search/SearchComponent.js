import './SearchComponent.css';
import { useState } from 'react';

const SearchComponent= ({handleSearch, searchInput, handleSearchChange, handleKeyDown}) =>{
    

 return <div className='search'>
                <input
                className='search__input__bar'
                placeholder='Search'
                value={searchInput}
                onKeyDown={(e)=>handleKeyDown(e)}
                onChange={(e)=>handleSearchChange(e)}/>
                <button className='search__button' onClick={()=>handleSearch()}>
                <i className="fas fa-search" aria-hidden="true"></i>
                </button>
        </div>
}

export default SearchComponent

