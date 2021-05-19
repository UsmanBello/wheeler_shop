import * as actionTypes from "../constants/orderConstants";
import { emptyCart } from './cartActions'
import axios from "axios";

const config = {
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }}


export const createOrder = (newOrder) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });
  //  console.log(newOrder)
    const { data } = await axios.post("/api/orders", newOrder, config)
    // console.log(data)

    dispatch({
      type: actionTypes.CREATE_ORDER_SUCCESS,
      payload: data,
    });
    dispatch(emptyCart())
  } catch (error) {
    console.log(error.response)
    console.log(error)
    dispatch({
      type: actionTypes.CREATE_ORDER_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_ORDER_REQUEST });

    const { data } = await axios.put(`/api/orders/${order._id}`, order, config);
    dispatch({
      type: actionTypes.UPDATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/orders/${orderId}`, config);
    dispatch({
      type: actionTypes.DELETE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getOrders = (q, ordersPerPage, pageNumber) => async (dispatch) => {
  
  
  try {
    dispatch({ type: actionTypes.GET_ORDERS_REQUEST });
      let params = `?searchTerm=${q}&page=${pageNumber}&ordersPerPage=${ordersPerPage}`
      
      const { data } = await axios.get("/api/orders"+ params, config);
        console.log(data)
      dispatch({
        type: actionTypes.GET_ORDERS_SUCCESS,
        payload: data,
      });
  } catch (error) {
    console.log(error)
    dispatch({
      type: actionTypes.GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCustomerOrders = (id) => async (dispatch) => {
  try{
    console.log(id)
    dispatch({ type: actionTypes.GET_ORDERS_BY_CUSTOMER_REQUEST });
      const { data } = await axios.get("/api/orders/customer/"+id, config);
        console.log(data)
      dispatch({
        type: actionTypes.GET_ORDERS_BY_CUSTOMER_SUCCESS,
        payload: data,
      });
  } catch (error) {
    console.log(error)
    dispatch({
      type: actionTypes.GET_ORDERS_BY_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
} 

export const getOrdersCount = ( ) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_TOTAL_ORDERS_REQUEST });
    
    const { data } = await axios.get("/api/orders/totalOrders", config);
  
    dispatch({
      type: actionTypes.GET_TOTAL_ORDERS_SUCCESS,
      payload: data.totalorders,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TOTAL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/orders/${id}`, config);
      console.log(data)
    dispatch({
      type: actionTypes.GET_ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
   console.log(error)
    dispatch({
      type: actionTypes.GET_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeCustomerOrders = () => (dispatch) =>{
  dispatch({ type: actionTypes.GET_ORDERS_BY_CUSTOMER_RESET });
}
export const removeOrderDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_ORDER_DETAILS_RESET });
};