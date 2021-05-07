import './ViewItems.css'
import Modal  from "react-modal";

Modal.setAppElement("#root");

const ViewItems =({show, cancel, items}) => {

    return ( 
                        <Modal 
							isOpen={show}
							onRequestClose={cancel}
							contentLabel="Delete Order"
							className="mymodal"
							overlayClassName="myoverlay"
							closeTimeoutMS={100}
							 >
							<div className='items__ordered__container'>
                                    <table className="Item__table" border="0" cellSpacing="0" cellPadding="0"> 
                                    <thead>
                                        <tr className='orderedItems__table__row'>
                                            <th>#</th>
                                            <th width='40%'>Product</th>
                                            <th width='10%'>Qty</th>
                                            <th width='25%'>Unit Price</th>
                                            <th width='25%'>Line Total</th>
                                         </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map((item, index)=>{
                                                return  <tr className="orderedItems__table__row" key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{item.product}</td>
                                                            <td>{item.qty}</td>
                                                            <td>AED{item.price}</td>
                                                            <td>AED{item.price * item.qty}</td>
                                                        </tr>
                                             })
                                            
                                        }
                                    </tbody>
                                    </table>
                            </div>
						  </Modal>
    
    )
  }
  
  export default ViewItems;