import './CartItem.css';
import {  useState } from 'react'
import { Link } from 'react-router-dom';
import {getAmount} from '../../utils/helpers';

//COMPONENT
import QuantityForm from '../QuantityForm/QuantityForm'

const  CartItem=({ item , qtyChangeHandler, removeHandler})=> {


const [qty, setQty]=useState(item.qty)

const increaseQty=()=>{
     if(qty+1 <= item.countInStock){
       setQty(qty+1)
       qtyChangeHandler(item.product, qty+1)
     }
}
const decreaseQty=()=>{
  if(qty-1 >0){
    setQty(qty-1)
    qtyChangeHandler(item.product, qty-1)
  }
}
// const handleInputChange=(e)=>{
  // if(e.target.value > item.qty || e.target.value < 1 || isNaN(e.target.value)){
  //    setQty(qty)
  // }else{
  //    setQty(e.target.value)
  // }
    //  setQty(e.target.value)
  // qtyChangeHandler(item.product, e.target.value)
// }

  return (
    <div className='cartitem'>
       <div className='cartitem__image'>
            <img src={item.image}
                 alt={item.name}/>
       </div>
       <Link to={`/product/${item.product}`} className='cartitem__name'>
           <p>{item.name}</p>
       </Link>
       
       <p className='cartitem__price'>AED {getAmount(item.price)}</p>
      <QuantityForm 
        qty={qty}
        // handleInputChange={handleInputChange}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        />
        <p className='cartitem__price'>AED {getAmount(Number(item.price)*qty)}</p>
       <button className='cartitem__deleteBtn' onClick={()=>removeHandler(item.product)}>
           <i className='fas fa-trash'/>
       </button>
    </div>
  );
}

export default CartItem;