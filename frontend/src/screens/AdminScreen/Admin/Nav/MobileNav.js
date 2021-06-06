import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFileAlt, faShoppingCart, faTable, faUser} from '@fortawesome/free-solid-svg-icons'
import './MobileNav.css'

const MobileNav =({handleNavigationClick, active, handleToggleMobileNav, showMobileMenu}) => {

    return ( 
        <div className='mobile__admin__nav' onClick={()=>handleToggleMobileNav()}>
        <div></div>
        <div></div>
        <div></div>
   {showMobileMenu &&
        <ul className= "mobile__menu__options">
        <li className={active==='dashboard' ? 'mobile__menu__item active' : 'mobile__menu__item'} 
                        onClick={()=>handleNavigationClick('dashboard')}>
                            <FontAwesomeIcon icon={faTable}/>{' '}
                            Dashboard
                        </li>
                        <li className={active==='products' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('products')}>
                                <FontAwesomeIcon icon={faShoppingCart}/>{' '}
                                Products
                        </li>
                        <li className={active==='orders' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('orders')}>
                            <FontAwesomeIcon icon={faFileAlt}/>{' '}
                        Orders
                        </li>
                        <li className={active==='requests' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('requests')}>
                                <FontAwesomeIcon icon={faFileAlt}/>{' '}
                                Requests
                        </li>
                        <li className={active==='customers' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('customers')}>
                             <FontAwesomeIcon icon={faUser}/>{' '}
                            Customers
                        </li>
                      
    </ul>}
    </div>
    
   )
  }
  
  export default MobileNav;