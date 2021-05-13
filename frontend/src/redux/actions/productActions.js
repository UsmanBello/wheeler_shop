import * as actionTypes from "../constants/productConstants";
import axios from "axios";



export const createProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_PRODUCT_REQUEST });
   console.log(newProduct)
    const { data } = await axios.post("/api/products", newProduct);
    console.log(data)
    dispatch({
      type: actionTypes.CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error)
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

    const { data } = await axios.put(`/api/products/${product._id}`, product);
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

    const { data } = await axios.delete(`/api/products/${productId}`);
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


export const getProducts = (q, brand, category, subCategory,productsPerPage, pageNumber, sort) => async (dispatch) => {
  
  
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
      let params = `?searchTerm=${q}&brand=${brand}&category=${category}&subCategory=${subCategory}&page=${pageNumber}&productsPerPage=${productsPerPage}&sort=${sort}`
      
      const { data } = await axios.get("/api/products"+ params);
        console.log(data)
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
     
      const { data } = await axios.get("/api/products/related-products/"+id);//, {category, subCategory});
	  console.log(data)
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

export const getProductsCount = ( ) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_TOTAL_PRODUCTS_REQUEST });
    
    const { data } = await axios.get("/api/products/totalProducts");
  console.log(data)
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

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
      
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

