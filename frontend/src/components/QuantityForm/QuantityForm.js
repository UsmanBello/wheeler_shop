import './QuantityForm.css'

const QuantityForm=({qty, decreaseQty, increaseQty/*, handleInputChange*/})=>{
    
    return (
        <span className='cartitem__qty__controller'>
            <span className='reduce__qty' onClick={()=>decreaseQty()}>-</span>
            <input
            className='cartitem__select'
            value={qty}
            readOnly={true}
            // onChange={(e)=>handleInputChange(e)}
            />
            <span className='increase__qty' onClick={()=>increaseQty()}>+</span>
        </span>
    )

}

export default QuantityForm