import './AdminProductsFilter.css';
import useData from '../../../../utils/useData';
import SelectRowsPerPage from '../../../../components/SelectInput/SelectRowsPerPage';
import SelectSort from '../../../../components/SelectInput/SelectSort';


const AdminProductsFilter=({handleBrandChange, brandInput, handleCategoryChange, categoryInput, rowsPerPage, handleSetRowPerPage, sortChoice, handleSortSelect})=>{

    const {brands, categories}= useData()

    return(
        <div className='admin__products__filter__container'>
            <div className='left__side'>
             <select className='brand__select__input' value={brandInput} onChange={(e)=>handleBrandChange(e)}>
                                <option value=''>All Brands</option>
                                {
                                brands.map((brand, index)=>{
                                    return <option key={index} value={brand.name}>{brand.name}</option>
                                })}
                         </select>
                         <select className='category__select__input' value={categoryInput} onChange={(e)=>handleCategoryChange(e)}>
                                <option value=''>All Categories</option>
                                {
                                categories.map((category, index)=>{
                                    return <option key={index} value={category.main}>{category.main.split('_').join(' ')}</option>
                                })}
                         </select>
             </div>
             <div className='right__side'>
                       <div className='right__side__rowsperage'>
                        <SelectRowsPerPage rowsPerPage={rowsPerPage} handleSetRowPerPage={handleSetRowPerPage}/>
                        </div>
                        <div className='right__side__sortchoice'>
                            <SelectSort 
                                        sortChoice={sortChoice}
                                        handleSortSelect={handleSortSelect}/>
                        </div>

             </div>
        </div>
        )
}

export default AdminProductsFilter