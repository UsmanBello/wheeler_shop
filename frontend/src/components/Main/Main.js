import "./Main.css";
import { Switch, Route } from "react-router-dom";

//SCREENS
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import ShopScreen from "../../screens/ShopScreen/ShopScreen";
import ProductScreen from "../../screens/ProductScreen/ProductScreen";
import CartScreen from "../../screens/CartScreen/CartScreen";
import AdminScreen from "../../screens/AdminScreen/AdminScreen";
import CheckoutScreen from "../../screens/CheckoutScreen/CheckoutScreen";

function Main() {

  return (

     <main className='app'>
       <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/shop" component={ShopScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/admin" component={AdminScreen} />
          <Route exact path="/checkout" component={CheckoutScreen}/>
        </Switch>
     </main>
    
   
  );
}

export default Main;