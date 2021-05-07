

const Customer =({customer, handleEditToggle, handleDeleteToggle, handleViewCustomer, handleViewOrders}) => {
    return (
                 <tr className="table__row">
                                            <td></td>
                                     <td onClick={()=>handleViewCustomer(customer._id)}>{customer.fullName}</td>
                                     <td>{customer.email}</td>
                                     <td>{customer.phone}</td>
                                     <td onClick={()=>handleViewOrders(customer._id)}>{customer.orders.length}</td>
                                     <td className='admin__actions__container'>
                                            <button className='admin__edit__button' 
                                             onClick={()=>handleEditToggle(customer)}>
                                             <i className="fas fa-edit" aria-hidden="true"/>
                                             </button>{' '}
                                             <button className='admin__delete__button'
                                             onClick={()=>handleDeleteToggle(customer)}>
                                             <i className="fas fa-trash" aria-hidden="true"/>
                                             </button>
                                     </td>
                                     
                                 </tr>
                                
    )
  }
  
  export default Customer;