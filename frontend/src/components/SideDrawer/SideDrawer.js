import "./SideDrawer.css";
import { useLocation, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//ACTIONS
import { logout } from '../../redux/actions/authActions';

const SideDrawer = ({ show, click }) => {
  const style={
    backgroundColor: '#707070',
     color: 'white',
     transition: '0.4s'
   }
   const location= useLocation()
   const dispatch= useDispatch()

  const sideDrawerClass = ["sidedrawer"];
  const history = useHistory()

  
  const cart = useSelector((state) => state.cart);
  const currentUser= useSelector(state=>state.currentUser)

  
  const { cartItems } = cart;
  const { isAuthenticated }= currentUser

  const Logout=()=>{
    // e.preventDefault()
    dispatch(logout());
		history.push("/")
  }
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  if (show) {
    sideDrawerClass.push("show");
  }
 
  return (
    <div className={sideDrawerClass.join(" ")}>
    <ul className="sidedrawer__links" onClick={click}>
    <li>
        <NavLink exact to="/" activeStyle={style}>HOME</NavLink>
      </li>
      <li>
        <NavLink to="/shop" activeStyle={style}>SHOP</NavLink>
      </li>
      {isAuthenticated ?
      <>
      <li>
        <NavLink to='/admin' activeStyle={style}>Admin</NavLink>
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
        <NavLink to="/cart" activeStyle={style}>
            <span id={location.pathname==='/cart'? 'currently__side__cart': ''}>
            <i className="fas fa-shopping-cart"></i> {getCartCount()}
            </span>
        </NavLink>
      </li>
    </ul>
  </div>
  );
};

export default SideDrawer;

{/* <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart{" "}
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
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
        <li>
          <Link to='/login-admin'>Login</Link>
        </li>}
      </ul>
    </div> */}