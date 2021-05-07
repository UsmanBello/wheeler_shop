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
                            <i className="fa fa-table" aria-hidden="true"/>{' '}
                            Dashboard
                        </li>
                        <li className={active==='orders' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('orders')}>
                            <i className="fa fa-file" aria-hidden="true"/>{' '}
                        Orders
                        </li>
                        <li className={active==='products' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('products')}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"/>{' '}
                                Products
                        </li>
                        {/* <li className={active=== 'brands' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('brands')}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"/>{' '}{' '}
                                Brands
                        </li>
                        <li className={active=== 'categories' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('categories')}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"/>{' '}
                            Categories
                        </li> */}
                        <li className={active==='customers' ? 'mobile__menu__item active' : 'mobile__menu__item'}
                        onClick={()=>handleNavigationClick('customers')}>
                             <i className="fa fa-users" aria-hidden="true"/>{' '}
                            Customers
                        </li>
    </ul>}
    </div>
    
   )
  }
  
  export default MobileNav;