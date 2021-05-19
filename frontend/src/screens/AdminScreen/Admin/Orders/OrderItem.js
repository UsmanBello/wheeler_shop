
const OrderItem =({order, handleEditToggle, handleDeleteToggle, handleViewCustomer, handleViewItems}) => {
    return (
                 <tr className="table__row">
                                            <td></td>
                                     <td className='hide__at__mobile'>
                                       {order.invoiceNo}
                                     </td>
                                     <td>{new Date(order.createdAt).toDateString()}</td>
                                     <td className='clickable' onClick={()=>handleViewItems(order.items)}>{order.items.length}</td>
                                     <td className='hide__at__mobile'>{order.totalCost}</td>
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