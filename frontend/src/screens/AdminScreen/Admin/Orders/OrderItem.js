import './OrderItem.css';
import {getAmount} from '../../../../utils/helpers';
//COMPONENT
import Tooltip from '../../../../components/Tooltip/Tooltip';
const message=(text)=>{
  return <p style={{width:'300px'}}>{text}</p>
}
// onClick={()=>(showMessage(order.transactionStatus.message))}
const OrderItem =({order, handleEditToggle, handleDeleteToggle, handleViewCustomer, handleViewItems, showMessage}) => {
    return (
                 <tr className="table__row">
                                            <td></td>
                                     <td className='hide__at__mobile'>
                                       {order.invoiceNo} {order.transactionStatus?(order.transactionStatus.status ==='Success' ?
                                       <span className='transaction__success__badge'>S</span>:
                                       <Tooltip content={message(order.transactionStatus.message)}><span className='transaction__failure__badge' >F</span></Tooltip> ): ''}
                                     </td>
                                     <td>{new Date(order.createdAt).toDateString()}</td>
                                     <td className='clickable' onClick={()=>handleViewItems(order.items)}>{order.items.length}</td>
                                     <td className='hide__at__mobile'>AED {getAmount(order.totalCost)}</td>
                                     <td className='clickable' onClick={()=>handleViewCustomer(order.customer)}>{order.customerName}</td>
                                     <td className='admin__actions__container'>
                                             <button className='admin__edit__button' 
                                             onClick={()=>handleEditToggle(order)}>
                                             <i className="fas fa-edit" aria-hidden="true"/>
                                             </button>{' '}
                                             <button className='admin__delete__button'
                                             onClick={()=>handleDeleteToggle(order)}>
                                             <i className="fas fa-trash" aria-hidden="true"/>
                                             </button>
                                        
                                     </td>
                                     
                                 </tr>
                                
    )
  }
  
  export default OrderItem;