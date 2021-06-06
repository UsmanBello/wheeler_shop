import * as actionTypes from "../constants/requestConstants";
import axiosInstance from '../../utils/api'


export const createRequest = (newRequest) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_REQUEST_REQUEST });
  
    const { data } = await axiosInstance.post("/api/requests", newRequest)

    dispatch({
      type: actionTypes.CREATE_REQUEST_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    
    dispatch({
      type: actionTypes.CREATE_REQUEST_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deleteRequest = (requestId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_REQUEST_REQUEST });

     await axiosInstance.delete(`/api/requests/${requestId}`);
    dispatch({
      type: actionTypes.DELETE_REQUEST_SUCCESS,
      payload: requestId,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_REQUEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getRequests = (q,  requestsPerPage, pageNumber) => async (dispatch) => {
  
  
  try {
    dispatch({ type: actionTypes.GET_REQUESTS_REQUEST });
      let params = `?searchTerm=${q}&page=${pageNumber}&requestsPerPage=${requestsPerPage}`
      const { data } = await axiosInstance.get("/api/requests"+ params);
       
      dispatch({
        type: actionTypes.GET_REQUESTS_SUCCESS,
        payload: data,
      });

  } catch (error) {
    dispatch({
      type: actionTypes.GET_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getRequestsCount = ( ) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_TOTAL_REQUESTS_REQUEST });
    
    const { data } = await axiosInstance.get("/api/requests/total-requests");
  
    dispatch({
      type: actionTypes.GET_TOTAL_REQUESTS_SUCCESS,
      payload: data.totalRequests,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TOTAL_REQUESTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

