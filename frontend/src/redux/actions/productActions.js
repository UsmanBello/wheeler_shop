import * as actionTypes from "../constants/productConstants";
import axios from "axios";
import axiosInstance from '../../utils/api'

const config = {
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }}


export const createProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_PRODUCT_REQUEST });
    const { data } = await axiosInstance.post("/api/products", newProduct);
    dispatch({
      type: actionTypes.CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST });

    const { data } = await axiosInstance.put(`/api/products/${product._id}`, product);
    dispatch({
      type: actionTypes.UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST });

    const { data } = await axiosInstance.delete(`/api/products/${productId}`);
    dispatch({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getProducts = (q, brand, category, subCategory,productsPerPage, pageNumber, sort, outOfStock) => async (dispatch) => {
  
  
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
      let params = `?searchTerm=${q}&brand=${brand}&category=${category}&subCategory=${subCategory}&page=${pageNumber}&productsPerPage=${productsPerPage}&sort=${sort}&outOfStock=${outOfStock}`
      
      const { data } = await axiosInstance.get("/api/products"+ params);
      dispatch({
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: data,
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRelatedProducts = (id/*, category, subCategory*/) => async (dispatch) => {
  
  
  try {
    dispatch({ type: actionTypes.GET_RELATED_PRODUCTS_REQUEST });
     
      const { data } = await axiosInstance.get("/api/products/related-products/"+id);//, {category, subCategory});
	  
      dispatch({
        type: actionTypes.GET_RELATED_PRODUCTS_SUCCESS,
        payload: data,
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_RELATED_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSomeProducts = (ids) => async (dispatch) =>{
  try {
    
    dispatch({ type: actionTypes.GET_SOME_PRODUCTS_REQUEST });
      const { data } = await axios.get("/api/products/some-products", {...config, params: {ids}});
      dispatch({
        type: actionTypes.GET_SOME_PRODUCTS_SUCCESS,
        payload: data,
      });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SOME_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
export const getProductsCount = ( ) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_TOTAL_PRODUCTS_REQUEST });
    
    const { data } = await axiosInstance.get("/api/products/totalProducts");
    dispatch({
      type: actionTypes.GET_TOTAL_PRODUCTS_SUCCESS,
      payload: data.totalproducts,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TOTAL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOutOfStockCount = ( ) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OUT_OF_STOCK_COUNT_REQUEST });
    
    const { data } = await axiosInstance.get("/api/products/out-of-stock-count");
    console.log(data)
    dispatch({
      type: actionTypes.GET_OUT_OF_STOCK_COUNT_SUCCESS,
      payload: data.outOfStockCount,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_OUT_OF_STOCK_COUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/api/products/${id}`);
      
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
   
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
       dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};

export const removeRelatedProducts = () => (dispatch) => {
       dispatch({ type: actionTypes.GET_RELATED_PRODUCT_DETAILS_RESET });
};

