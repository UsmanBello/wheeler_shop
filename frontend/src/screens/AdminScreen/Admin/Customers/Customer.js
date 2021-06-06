

const Customer =({customer,  handleDeleteToggle, handleViewCustomer, handleViewOrders}) => {
    return (
                 <tr className="table__row">
                                            <td width='5%'></td>
                                     <td className='clickable same' onClick={()=>handleViewCustomer(customer._id)}>{`${customer.firstName} ${customer.lastName}`}</td>
                                     <td className='hide__at__mobile'>{customer.email}</td>
                                     <td className='same'>{customer.phone}</td>
                                     <td className='clickable' onClick={()=>handleViewOrders(customer._id)}>{customer.orders.length}</td>
                                     <td className='admin__actions__container'>
                                             <button className='admin__delete__button'
                                             onClick={()=>handleDeleteToggle(customer._id)}>
                                             <i className="fas fa-trash" aria-hidden="true"/>
                                             </button>
                                     </td>
                                     
                                 </tr>
                                
    )
  }
  
  export default Customer;