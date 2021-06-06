import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import jwtDecode from 'jwt-decode'

// //Action
// import {setAuthorizationToken} from './actions/authActions'

// Reducers
import { cartReducer } from "./reducers/cartReducers";
// import {
//   getProductsReducer,
//   getProductDetailsReducer,
//   createProductReducer,
//   updateProductReducer,
//   deleteProductReducer
// } from "./reducers/productReducers";
import { currentUser } from "./reducers/authReducers"
import { product } from "./reducers/productReducers"
import { customer } from "./reducers/customerReducers"
import { order } from "./reducers/orderReducers"
import { request } from "./reducers/requestReducers"



const reducer = combineReducers({
  cart: cartReducer,
  product,
  customer,
  order,
  request,
  currentUser
});

const middleware = [thunk];

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
// const userLocalStorage= localStorage.getItem("jwtToken")
// ? jwtDecode(localStorage.jwtToken)
// : {};
// const isAuthenticatedLocalStorage= 
  // const userLocalStorage=()=>{
  //   if(localStorage.jwtToken){
  //     setAuthorizationToken(localStorage.jwtToken) 
  //     try{
  //       if( jwtDecode(localStorage.jwtToken).exp > Math.floor(new Date().getTime() / 1000)){
  //         console.log(jwtDecode(localStorage.jwtToken))
  //         return jwtDecode(localStorage.jwtToken)
  //       }else{
  //         return {}
  //       }
  //     }catch(e){
  //        return {}
        
  //       }
  //   }
  // }
// const jwtTokenLocalStorage = localStorage.getItem("jwtToken")
// ? JSON.parse(localStorage.getItem("jwtToken"))
// : [];
const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
  // currentUser: {
  //    user: userLocalStorage
  // }
};


const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;