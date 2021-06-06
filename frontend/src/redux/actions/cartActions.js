import * as actionTypes from "../constants/cartConstants";
import  axiosInstance,{setTokenHeader } from '../../utils/api'


export const addToCart = (id, qty) => async (dispatch, getState) => {
	try{
		dispatch({type: actionTypes.ADD_TO_CART_REQUEST})
  const { data } = await axiosInstance.get(`/api/products/${id}`)		
							  dispatch({
								type: actionTypes.ADD_TO_CART,
								payload: {
								  product: data._id,
								  name: data.name,
								  image: data.images[0].image,
								  price: data.price,
								  countInStock: data.countInStock,
								  qty,
								},
							  });

							  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
	}catch(error){
		dispatch({
      type: actionTypes.ADD_TO_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
	}
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const emptyCart = () => (dispatch) => {
  dispatch({
    type: actionTypes.EMPTY_CART
  });

  localStorage.removeItem("cart");
};


