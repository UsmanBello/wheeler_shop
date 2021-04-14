import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { cartReducer } from "./reducers/cartReducers";
// import {
//   getProductsReducer,
//   getProductDetailsReducer,
//   createProductReducer,
//   updateProductReducer,
//   deleteProductReducer
// } from "./reducers/productReducers";
import { product } from "./reducers/productReducers"

const reducer = combineReducers({
  cart: cartReducer,
  product
  // getProducts: getProductsReducer,
  // getProductDetails: getProductDetailsReducer,
  // createProduct: createProductReducer,
  // updateProduct: updateProductReducer,
  // deleteProduct: deleteProductReducer,

});

const middleware = [thunk];

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;