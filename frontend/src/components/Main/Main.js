import "./Main.css";
import { Switch, Route } from "react-router-dom";

//SCREENS
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import ShopScreen from "../../screens/ShopScreen/ShopScreen";
import ProductScreen from "../../screens/ProductScreen/ProductScreen";
import CartScreen from "../../screens/CartScreen/CartScreen";
import AdminScreen from "../../screens/AdminScreen/AdminScreen";
import CheckoutScreen from "../../screens/CheckoutScreen/CheckoutScreen";
import AuthScreen from '../../screens/AuthScreen/AuthScreen';
import ServicesScreen from '../../screens/ServicesScreen/ServicesScreen';
import AboutScreen from '../../screens/AboutScreen/AboutScreen';
//COMPONENT
import NotFound from '../../components/NotFound/NotFound';
//PROTECTED ROUTES
import ProtectedRoutes from '../../hocs/ProtectedRoutes';
import ProtectedCheckout from '../../hocs/ProtectedCheckout';


function Main() {

  return (

     <main className='app'>
       <Switch>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path ='/services' component={ServicesScreen}/>
          <Route exact path="/shop" component={ShopScreen}/>
          <Route exact path="/about" component={AboutScreen}/>
          <Route exact path="/product/:id" component={ProductScreen}/>
          <Route exact path="/cart" component={CartScreen}/>
          <ProtectedRoutes exact path="/admin" component={AdminScreen}/>
          <ProtectedCheckout exact path="/checkout" component={CheckoutScreen}/>
          <Route exact path="/register-admin" render={(props) => ( <AuthScreen isSignup={true}  {...props}/>)}/>
          <Route exact path="/login-admin" render={(props) => ( <AuthScreen isSignup={false}  {...props}/>)}/>
          <Route component={NotFound}/>
        </Switch>
     </main>
    
   
  );
}

export default Main;