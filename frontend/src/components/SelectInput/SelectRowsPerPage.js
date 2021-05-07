import './SelectRowsPerPage.css'



const SelectRowsPerPage=({rowsPerPage, handleSetRowPerPage})=>{
return(
    <>
                         <select className='rowsPerPage__select__input' value={rowsPerPage} onChange={(e)=>handleSetRowPerPage(e)}>
                                
                                <option value={15}>15 Products per page</option>
                                <option value={30}>30 Products per page</option>
                                <option value={45}>45 Products per page</option>
                                <option value={60}>60 Products per page</option>
                         </select>
</>
)
}

export default SelectRowsPerPage