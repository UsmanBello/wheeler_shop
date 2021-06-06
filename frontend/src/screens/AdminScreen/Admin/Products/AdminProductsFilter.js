import './AdminProductsFilter.css';
import {useSelectOption} from '../../../../utils/hooks';
import MySelect from '../../../../components/SelectInput/MySelect';


const AdminProductsFilter=({handleBrandChange, brandInput, handleCategoryChange, categoryInput, rowsPerPage, handleSetRowPerPage, sortChoice, handleSortSelect})=>{

    const {allBrandOptions, allCategoryOptions, rowsPerPageOptions, productSortOption}= useSelectOption()
    
    return(
        <div className='admin__products__filter__container'>
            <div className='left__side'>
            <div className='admin_product_filter__left__Side__brand__filter'>
             <MySelect 
             selectedValue={brandInput}
              handleSelectValue={handleBrandChange}
               selectOptions={allBrandOptions}/>
               </div>
               <div className='admin_product_filter__left__Side__category__filter'>
             <MySelect 
             selectedValue={categoryInput}
              handleSelectValue={handleCategoryChange}
               selectOptions={allCategoryOptions}/>
               </div>
             </div>
             <div className='right__side'>
                       <div className='right__side__rowsperage'>
                           <MySelect
                           selectedValue={rowsPerPage} 
                           handleSelectValue={handleSetRowPerPage}
                           selectOptions={rowsPerPageOptions}/>
                        </div>
                        <div className='right__side__sortchoice'>
                            <MySelect
                            selectedValue={sortChoice} 
                           handleSelectValue={handleSortSelect}
                           selectOptions={productSortOption}
                            />
                        </div>

             </div>
        </div>
        )
}

export default AdminProductsFilter