import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFileAlt, faShoppingCart, faTable, faUser} from '@fortawesome/free-solid-svg-icons'
import './SideNav.css'
import { faFirstOrder } from '@fortawesome/free-brands-svg-icons'

const SideNav =({handleNavigationClick, active}) => {


    return (
                 <div className= 'sticky__sidebar'>
                    <ul className='adminscreen__menu'>
                        <li className={active==='dashboard' ? 'side__menu__item active' : 'side__menu__item'} 
                        onClick={()=>handleNavigationClick('dashboard')}>
                            <FontAwesomeIcon icon={faTable}/>{' '}
                            Dashboard
                        </li>
                        <li className={active==='products' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('products')}>
                             <FontAwesomeIcon icon={faShoppingCart}/>{' '}
                                Products
                        </li>
                        <li className={active==='orders' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('orders')}>
                           <FontAwesomeIcon icon={faFileAlt}/>{' '}
                        Orders
                        </li>
                        <li className={active==='requests' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('requests')}>
                                <FontAwesomeIcon icon={faFileAlt}/>{' '}
                                Requests
                        </li>
                        <li className={active==='customers' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('customers')}>
                             <FontAwesomeIcon icon={faUser}/>{' '}
                            Customers
                           
                        </li>
                    </ul>
                </div>
    )
  }
  
  export default SideNav;