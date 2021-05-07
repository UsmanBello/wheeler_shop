import './DeleteModal.css'
import Modal  from "react-modal";


Modal.setAppElement("#root");

const DeleteModal =({show, handleDelete, cancel,id, toDelete}) => {

    return ( 
                        <Modal 
							isOpen={show}
							onRequestClose={cancel}
							contentLabel="Delete Product"
							className="mymodal"
							overlayClassName="myoverlay"
							closeTimeoutMS={100}
							 >
							<div className='delete__modal'>
                               <div className='delete__modal__messae__container'>
                                   <p className='delete__modal__message'>
                                        Are you sure you want to delete this {`${toDelete}`}?
                                   </p>
                               </div>
                            </div>
                            <hr></hr>
                            <div className='delete__modal__actions'>
                                <button className='modal__cancel__button'
                                onClick={()=>cancel()}>
                                    Cancel
                                </button>
                                <button  className='modal__delete__button'
                                onClick={()=>handleDelete(id)}>
                                    Delete
                                </button>

                            </div>
						  </Modal>
    
    )
  }
  
  export default DeleteModal;