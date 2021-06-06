import './ViewOrders.css'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Modal  from "react-modal";
import {getAmount} from '../../../../utils/helpers'


//ACTION
import { getCustomerOrders } from '../../../../redux/actions/orderActions'//fetch orders by customer
// import { getCustomerDetails } from '../../../../redux/actions/customerActions'//fetch orders by customer

Modal.setAppElement("#root");
const ViewOrders=({show, cancel, customerId})=>{

const dispatch= useDispatch()
const customerOrdersState = useSelector(state=> state.order)
const { loading, error, customerOrders } = customerOrdersState

useEffect(()=>{
    // if(show){
    console.log(customerId)
//  dispatch(getCustomerDetails(customerId))
  dispatch(getCustomerOrders(customerId))
    // } 
},[dispatch, customerId])
console.log(customerOrders)
return (loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : 
    <Modal 
    isOpen={show}
    onRequestClose={cancel}
    contentLabel="Delete Order"
    className="mymodal"
    overlayClassName="myoverlay"
    closeTimeoutMS={100}
     >
    <div className='items__ordered__container'>
        <div className='table__container'>
            <table className="Item__table" border="0" cellSpacing="0" cellPadding="0"> 
            <thead>
                <tr className='orderedItems__table__row'>
                    <th>#</th>
                    <th width='35%'>Invoice No</th>
                    <th width='35%'>Date</th>
                    <th  width='5%'>Products</th>
                    <th width='25%'>Total</th>
                 </tr>
            </thead>
            <tbody>
                {
                    customerOrders.map((order, index)=>{
                        return  <tr className="orderedItems__table__row" key={order._id}>
                                    <td></td>
                                    <td>{order.invoiceNo}</td>
                                    <td>{new Date(order.createdAt).toDateString()}</td>
                                    <td>{order.items.length}</td>
                                    <td>AED {getAmount(order.totalCost)}</td>
                                </tr>
                     })
                }
            </tbody>
            </table>
            </div>
    </div>
  </Modal>
)
}

export default ViewOrders