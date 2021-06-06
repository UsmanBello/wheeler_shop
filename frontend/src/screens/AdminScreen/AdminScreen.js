import './AdminScreen.css'
import{ useState, useEffect} from 'react'
import queryString from 'query-string'
import {useDispatch, useSelector} from 'react-redux'

//Components
import SideNav from './Admin/Nav/SideNav';
import Products from './Admin/Products/Products';
import Orders from './Admin/Orders/Orders';
import Customers from './Admin/Customers/Customers';
import Requests from './Admin/Requests/Requests';
import MobileNav from './Admin/Nav/MobileNav';
import AdminSideDrawer from './Admin/AdminSideDrawer/AdminSideDrawer'
import Backdrop from '../../components/Backdrop/Backdrop'
//ACTION
import {getOutOfStockCount} from '../../redux/actions/productActions'
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';

const AdminScreen =({location, history}) => {

  
  // console.log(location)
  const { search }  = location
  const queryParams = queryString.parse(search)
  // const currentAdminOption = extractTerm(queryParams.admin_option)

  const dispatch= useDispatch()
  const productState= useSelector( state=> state.product)
  const currentUser = useSelector( state=> state.currentUser)

  const { loading, outOfStockCount}= productState
  const { user } = currentUser
  const [adminSideToggle, setAdminSideToggle]=useState(false)
// const [showMobileMenu, setShowMobileMenu]= useState(false)
const [activeNav, setActiveNav]= useState(queryParams.admin_option? queryParams.admin_option : 'dashboard')

  useEffect(()=>{
     dispatch(getOutOfStockCount())
  },[dispatch])

  useEffect(()=>{
    //If it is on the same admin option, we should not reset the other query params
    var newQueryParams= queryParams.admin_option===activeNav ? {...queryParams, admin_option: activeNav} : {admin_option: activeNav}
    history.push({
      pathname: '/admin',
      search: queryString.stringify(newQueryParams)
    })

  },[activeNav])
 
  const handleNavigationClick=(option)=>{
      setActiveNav(option)
  }
  

    return (
  
       <div className='adminscreen'>
         <div className="adminscreen__left" id='sticky__left'>
             <SideNav 
             handleNavigationClick={handleNavigationClick}
             active={activeNav}/>
         </div>
         <div className="adminscreen__right">
           <div className='adminscreen__right__header'>
             <h2>Hello {user.firstName} {user.lastName}</h2>
              { activeNav==='products' &&
              <p className='out__of__stock__count__link'
              onClick={()=>history.push({pathname:'/admin',
               search: '?admin_option=products&page=1&outOfStock=true'})}>
               {loading ?`Show out of stock products` : `Show (${outOfStockCount}) products out of stock`}
               </p>}
             <HamburgerMenu click={()=>setAdminSideToggle(true)} navBar={false}/>
           </div>
              {activeNav==='dashboard' && <div><h1>LIST OF ADMINS GOES HERE</h1></div>}
              {activeNav==='orders' && <Orders location={location} history={history}/>}
              {activeNav==='products' &&  <Products location={location} history={history}/>}
              {activeNav==='customers' && <Customers location={location} history={history}/>}
              {activeNav==='requests' && <Requests location={location} history={history}/>}
         </div>
         <AdminSideDrawer
          show={adminSideToggle}
          click={()=>setAdminSideToggle(false)} 
          handleNavigationClick={handleNavigationClick}
          active={activeNav}
          // active={activeNav}
          // handleToggleMobileNav={()=>setShowMobileMenu(!showMobileMenu)}
          // showMobileMenu={showMobileMenu}
          />
          <Backdrop show={adminSideToggle} click={()=>setAdminSideToggle(false)}/>
       </div>
    );
  }
  
  export default AdminScreen;
  // <MobileNav
  //            handleNavigationClick={handleNavigationClick}
  //            active={activeNav}
  //            handleToggleMobileNav={()=>setShowMobileMenu(!showMobileMenu)}
  //            showMobileMenu={showMobileMenu}/>