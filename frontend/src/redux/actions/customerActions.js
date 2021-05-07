import * as actionTypes from "../constants/customerConstants";
import axios from "axios";



export const createCustomer = (newCustomer) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_CUSTOMER_REQUEST });
   console.log(newCustomer)
    const { data } = await axios.post("/api/customers", newCustomer);
    console.log(data)
    dispatch({
      type: actionTypes.CREATE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: actionTypes.CREATE_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCustomer = (customer) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_CUSTOMER_REQUEST });

    const { data } = await axios.put(`/api/customers/${customer._id}`, customer);
    dispatch({
      type: actionTypes.UPDATE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_CUSTOMER_REQUEST });

    const { data } = await axios.delete(`/api/customers/${customerId}`);
    console.log(data)
    dispatch({
      type: actionTypes.DELETE_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getCustomers = (q, customersPerPage, pageNumber) => async (dispatch) => {
  
  
  try {
    dispatch({ type: actionTypes.GET_CUSTOMERS_REQUEST });
    let params = `?searchTerm=${q}&page=${pageNumber}&customersPerPage=${customersPerPage}`
      
      const { data } = await axios.get("/api/customers"+params);
        console.log(data)
      dispatch({
        type: actionTypes.GET_CUSTOMERS_SUCCESS,
        payload: data,
      });
  } catch (error) {
    console.log(error)
    dispatch({
      type: actionTypes.GET_CUSTOMERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCustomersCount = ( ) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_TOTAL_CUSTOMERS_REQUEST });
    
    const { data } = await axios.get("/api/customers/totalCustomers");
  console.log(data)
    dispatch({
      type: actionTypes.GET_TOTAL_CUSTOMERS_SUCCESS,
      payload: data.totalcustomers,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TOTAL_CUSTOMERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCustomerDetails = (id) => async (dispatch) => {
  try {
    console.log(id)
    dispatch({ type: actionTypes.GET_CUSTOMER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/customers/${id}`);
      
    dispatch({
      type: actionTypes.GET_CUSTOMER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: actionTypes.GET_CUSTOMER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeCustomerDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_CUSTOMER_DETAILS_RESET });
};