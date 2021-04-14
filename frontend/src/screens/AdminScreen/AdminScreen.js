import './AdminScreen.css'
import{ useState} from 'react'

//Components
import SideNav from './Admin/Nav/SideNav';
import Products from './Admin/Products/Products';
import MobileNav from './Admin/Nav/MobileNav';

const AdminScreen =() => {
const [showMobileMenu, setShowMobileMenu]= useState(false)
const [activeNav, setActiveNav]= useState('dashboard')
const [active, setActive]= useState({
  dashboard: true,
  orders: false,
  products: false,
  brands: false,
  categories: false,
  customers: false})
 
 
  const handleNavigationClick=(option)=>{
      
       setActive({dashboard: option==='dashboard', 
                  orders: option=== 'orders',
                  products: option=== 'products',
                  brands: option=== 'brands',
                  categories: option==='categories', 
                  customers: option=== 'customers'
                  })
        setActiveNav(option)
   
  }
  

    return (
  
       <div className='adminscreen' onClick={()=>showMobileMenu && setShowMobileMenu(false)} >
         <div className="adminscreen__left" id='sticky__left'>
             <SideNav 
             handleNavigationClick={handleNavigationClick}
             active={activeNav}/>
         </div>
         <div className="adminscreen__right">
           <div className='adminscreen__right__header'>
             <h2>Hello Salwan</h2>
             <MobileNav
             handleNavigationClick={handleNavigationClick}
             active={activeNav}
             handleToggleMobileNav={()=>setShowMobileMenu(!showMobileMenu)}
             showMobileMenu={showMobileMenu}/>
           </div>
              {active.dashboard && <div><h1>LIST OF ADMINS GOES HERE</h1></div>}
              {active.orders &&  <div><h1>ORDERS GOES HERE</h1></div>}
              {active.products &&  <Products/>}
              {active.brands && <div><h1>LIST OF BRANDS GOES HERE</h1></div>}
              {active.categories &&  <div><h1>LIST CATEGORIES GOES HERE</h1></div>}
              {active.customers && <div><h1>LIST OF CUSTOMERS GOES HERE</h1></div>}
         </div>
       </div>
    );
  }
  
  export default AdminScreen;