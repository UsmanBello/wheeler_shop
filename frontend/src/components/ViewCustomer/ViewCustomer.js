import './ViewCustomer.css'
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import Modal  from "react-modal";

//ACTIONS
import {getCustomerDetails,
     removeCustomerDetails} from '../../redux/actions/customerActions'
Modal.setAppElement("#root");

const ViewCustomer=({show, cancel, customerId}) => {

    const dispatch= useDispatch()
    const customerState= useSelector(state=> state.customer)
    const { customer, loading, error} = customerState;

useEffect(()=>{
   dispatch(getCustomerDetails(customerId))
   return ()=>{
       dispatch(removeCustomerDetails())
   }
},[dispatch, customerId])

    return ( 
                        <Modal 
							isOpen={show}
							onRequestClose={cancel}
							contentLabel="Delete Order"
							className="mymodal"
							overlayClassName="myoverlay"
							closeTimeoutMS={100}
							 >
                        { loading? <h2>Loadding...</h2>: error ? <h2>{error}</h2>: 
							<div className='customer__info__container'>
                                <div className='customer__info__content'>
                                    <div className='customer__info'>
                                        <span className='info__title'>Full Name :</span>{" "}
                                        <span className='info'>{`${customer.firstName} ${customer.lastName}`}</span>
                                    </div>
                                    <div className='customer__info'>
                                        <span className='info__title'>Phone :</span>{" "}
                                        <span className='info'>{customer.phone || 'N/A'} </span>
                                    </div>
                                    <div className='customer__info'>
                                        <span className='info__title'>Email :</span>{" "}
                                        <span className='info'>{customer.email}</span>
                                    </div>
                                    <div className='customer__info'>
                                        <span className='info__title'>Address :</span>{" "}
                                        <span className='info'>{customer.street || 'N/A'}</span>
                                    </div> 
                                    <div className='customer__info'>
                                        <span className='info__title'>State :</span>{" "}
                                        <span className='info'>{customer.city || 'N/A'}</span>
                                    </div>
                                    <div className='customer__info'>
                                        <span className='info__title'>Country :</span>{" "}
                                        <span className='info'>{customer.country || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        }
						  </Modal>
    
    )
  }
  
  export default ViewCustomer;