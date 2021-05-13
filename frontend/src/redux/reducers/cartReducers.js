import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
  loadingToCart: true, 
  cartError: ''
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
		  loadingToCart: false
        };
      }
	 case actionTypes.ADD_TO_CART_FAILURE:
      return {
        ...state,
        loadingToCart: false,
        cartError: action.payload,
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
		loadingToCart: false
      };
      case actionTypes.EMPTY_CART:
        return {
          ...state,
          cartItems: [],
		loadingToCart: false
        }
    default:
      return state;
  }
};