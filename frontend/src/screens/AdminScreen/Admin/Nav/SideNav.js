import './SideNav.css'

const SideNav =({handleNavigationClick, active}) => {


    return (
                 <div className= 'sticky__sidebar'>
                    <ul className='adminscreen__menu'>
                        <li className={active==='dashboard' ? 'side__menu__item active' : 'side__menu__item'} 
                        onClick={()=>handleNavigationClick('dashboard')}>
                            <i className="fa fa-table" aria-hidden="true"/>{' '}
                            Dashboard
                        </li>
                        <li className={active==='orders' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('orders')}>
                            <i className="fa fa-file" aria-hidden="true"/>{' '}
                        Orders
                        </li>
                        <li className={active==='products' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('products')}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"/>{' '}
                                Products
                        </li>
                        <li className={active=== 'brands' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('brands')}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"/>{' '}{' '}
                                Brands
                        </li>
                        <li className={active=== 'categories' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('categories')}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"/>{' '}
                            Categories
                        </li>
                        <li className={active==='customers' ? 'side__menu__item active' : 'side__menu__item'}
                        onClick={()=>handleNavigationClick('customers')}>
                             <i className="fa fa-users" aria-hidden="true"/>{' '}
                            Customers
                           
                        </li>
                    </ul>
                </div>
    )
  }
  
  export default SideNav;