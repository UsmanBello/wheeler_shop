import './Navbar.css';
import { NavLink, Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from '../../images/logoS.jpeg'
import { logout } from '../../redux/actions/authActions';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

function Navbar({click}) {
   
  const style={
    borderBottom:'4px solid #ad0207',
     transition: '0.8'
   }
   const cartStyle={
     color: '#ad0207'
   }
   const location= useLocation()
    const dispatch = useDispatch()  
    const history= useHistory()

    const cart = useSelector((state) => state.cart);
    const currentUser= useSelector( state=> state.currentUser)
    // console.log(currentUser)
 
    
  const { cartItems } = cart;
  const { isAuthenticated} = currentUser;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
  const Logout=()=>{
		dispatch(logout())
		history.push("/")
	}

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className="navbar__logo">
          <Link to={'/'} className='brand__icon'>
           <em><strong>SALWAN</strong></em>
          </Link>
        </div>

      <ul className="navbar__links">
      <li>
          <NavLink exact to="/" activeStyle={style}>HOME</NavLink>
        </li>
        <li>
          <NavLink to="/shop" activeStyle={style}>SHOP</NavLink>
        </li>
        {isAuthenticated ?
        <>
        <li>
          <Link to='/admin'>Admin</Link>
        </li>
        <li>
           <p onClick={()=>Logout()}>Logout</p>
        </li>
        </>
        :
        <>
        <li>
          <NavLink to="/services" activeStyle={style}>SERVICES</NavLink>
        </li>
        <li>
          <NavLink to="/about" activeStyle={style}>ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/login-admin" activeStyle={style}>CONTACT</NavLink>
        </li>
        </>
        }
        <li>
          <NavLink to="/cart" id='cart__link'>
              <span id={location.pathname==='/cart'?'currently__cart': ''}>
              <i className="fas fa-shopping-cart"></i> {getCartCount()}
              </span>
          </NavLink>
        </li>
      </ul>

      <HamburgerMenu click={click} navBar={true}/>
      </div>
    </nav>
  );
}

export default Navbar;