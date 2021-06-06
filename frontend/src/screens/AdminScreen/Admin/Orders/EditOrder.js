import { useState, useEffect } from 'react';
import Modal  from "react-modal";
import {getAmount} from '../../../../utils/helpers'
import './EditOrder.css';


const EditOrder=({order, cancel, show, edit})=>{

   const [status, setStatus]= useState('')
  
   const handleChange=(e)=>{
      setStatus(e.target.value)
   }
    useEffect(()=>{
        setStatus(order.status)
    },[order])
    return (
        <Modal 
        isOpen={show}
        onRequestClose={cancel}
        contentLabel="Edit Order"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={100}
         >
        <div className='view__order__info'>
        <header><h3>Order Information</h3> <span onClick={()=>cancel()}>X</span></header>

            <div className='read__only__order__info'>
                <div className='order__info'>
                    <strong>Invoice No</strong>: {order.invoiceNo}
                </div>
                <div className='order__info'>
                    <strong>Total cost</strong>: AED {getAmount(order.totalCost)}
                </div>
                <div className='order__info'>
                    <strong>Status</strong>: {status==='inProgress' && 'In progress'} {status==='shipped' && 'Shipped'} {status==='delivered' && 'Delivered'}
                </div>
                <div className='order__info'>
                    <strong>Payment Method</strong>: {order.paymentType}
                </div>
                <div className='order__info'>
                    <strong>Shipping</strong>: {order.shipping==='flatRate'? 'Flat rate' : 'Local pick up'}
                </div>
                <div className='order__info'>
                    <strong>Customer Name</strong>: {order.customerName}
                </div>
                <div className='order__info'>
                    <strong>Customer Id</strong>: {order.customer}
                </div>
                <div className='order__info'>
                    <strong>Date</strong>: {new Date(order.createdAt).toDateString()}
                </div>
                
            </div>
            <div className='change__status__container'>
                    
                    <div className='change__status'>
                    <label> Change order status:</label>
                    <select value={status} className='status__change__input' onChange={(e)=>handleChange(e)}>
                        <option value={'inProgress'}>In progress</option>
                        <option value={'shipped'}>Shipped</option>
                        <option value={'delivered'}>Delivered</option>
                    </select>
                    </div>
                    <button onClick={()=>edit(order._id, status)} className='save__newstatus'>
                        Save
                    </button>
            </div>
        </div>
        </Modal>
    )
}

export default EditOrder