import './SelectSort.css'


const SelectSort=({sortChoice, handleSortSelect})=>{
    return (
    <>
    <select className="sort-by" value={sortChoice} onChange={(e)=>handleSortSelect(e.target.value)}>
        <option value={'latest'}>Sort by latest</option>
        <option value={'ascending'}>Sort by price: Low to High</option>
        <option value={'descending'}>Sort by price: High to Low</option>
        <option value={'sales'}>sales</option>
    </select>
    </>
    )
}

export default SelectSort