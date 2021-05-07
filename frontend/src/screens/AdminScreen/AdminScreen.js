import './AdminScreen.css'
import{ useState, useEffect} from 'react'
import queryString from 'query-string'

//Components
import SideNav from './Admin/Nav/SideNav';
import Products from './Admin/Products/Products';
import Orders from './Admin/Orders/Orders';
import Customers from './Admin/Customers/Customers';
import MobileNav from './Admin/Nav/MobileNav';
import { extractTerm } from '../../utils/helpers';

const AdminScreen =({location, history}) => {

  // console.log(location)
  const { search }  = location
  const queryParams = queryString.parse(search)
  const currentAdminOption = extractTerm(queryParams.admin_option)

const [showMobileMenu, setShowMobileMenu]= useState(false)
const [activeNav, setActiveNav]= useState(currentAdminOption)

  useEffect(()=>{
    var newQueryParams= {
      ...queryParams,
      admin_option: activeNav
    }
    history.push({
      pathname: '/admin',
      search: queryString.stringify(newQueryParams)
    })

  },[activeNav])
 
  const handleNavigationClick=(option)=>{
      setActiveNav(option)
  }
  

    return (
  
       <div className='adminscreen' onClick={()=>showMobileMenu && setShowMobileMenu(false)} >
         <div className="adminscreen__left" id='sticky__left'>
             <SideNav 
             handleNavigationClick={handleNavigationClick}
             active={activeNav===''? 'dashboard': activeNav}/>
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
              {(currentAdminOption==='' || activeNav==='dashboard') && <div><h1>LIST OF ADMINS GOES HERE</h1></div>}
              {activeNav==='orders' && <Orders location={location} history={history}/>}
              {activeNav==='products' &&  <Products location={location} history={history}/>}
              {activeNav==='customers' && <Customers location={location} history={history}/>}
         </div>
       </div>
    );
  }
  
  export default AdminScreen;