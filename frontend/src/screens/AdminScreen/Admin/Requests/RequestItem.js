import{Link} from 'react-router-dom'
//COMPONENT
import Tooltip from '../../../../components/Tooltip/Tooltip';

const RequestItem =({request,  handleDeleteToggle }) => {
    return ( 
                 <tr className="table__row">
                    
                                            <td width='5%'></td>
                                     <td style={{cursor: 'pointer'}} className='same'>
                                     <Tooltip content={new Date(request.createdAt).toDateString()}>
                                      {request.fullName}
                                      </Tooltip>
                                     </td>
                                     <td className='hide__at__mobile'>{request.email}</td>
                                     <td className='hide__at__mobile'>{request.phone}</td>
                                     <td className='same'><Link to={`product/${request.product}`}>{request.product}</Link> </td>
                                     <td className='admin__actions__container'>
                                             <button className='admin__delete__button'
                                             onClick={()=>handleDeleteToggle(request._id)}>
                                             <i className="fas fa-trash" aria-hidden="true"/>
                                             </button>
                                        
                                     </td>
                   
                </tr>
     
    )
  }
  
  export default RequestItem;