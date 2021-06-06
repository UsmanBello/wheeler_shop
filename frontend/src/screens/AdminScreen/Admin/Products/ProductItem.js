// import './Products.css'
import {getAmount} from '../../../../utils/helpers'
const ProductItem =({product, handleEditToggle, handleDeleteToggle}) => {
    return (
                 <tr className="table__row">
                                            <td></td>
                                     <td>{product.name}</td>
                                     <td className='hide__at__mobile'>
                                     <img src={product.images[0].image}
                                          alt={product.name}/>
                                     </td>
                                     <td>{getAmount(product.price)}</td>
                                     <td>{product.countInStock}</td>
                                     <td className='hide__at__mobile'>{product.brand}</td>
                                     <td>{product.category.split('_').join(' ')}</td>
                                     <td className='admin__actions__container'>
                                             <button className='admin__edit__button' 
                                             onClick={()=>handleEditToggle(product)}>
                                             <i className="fas fa-edit" aria-hidden="true"/>
                                             </button>{' '}
                                             <button className='admin__delete__button'
                                             onClick={()=>handleDeleteToggle(product)}>
                                             <i className="fas fa-trash" aria-hidden="true"/>
                                             </button>
                                        
                                     </td>
                                     
                                 </tr>
                                
    )
  }
  
  export default ProductItem;