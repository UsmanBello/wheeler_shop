import * as actionTypes from "../constants/requestConstants";
export const request = (state = { 
    requests: {fetchedRequests: [], count:0},
    requestsCount: 0,
    loading: true, 
    error: '' },
    action) => {
  switch (action.type) {
    //GET REQUESTS
    case actionTypes.GET_REQUESTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case actionTypes.GET_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: {fetchedRequests: action.payload.requests ,count: action.payload.count},
        loading: false,
        
      };
    case actionTypes.GET_REQUESTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
      //CREATE ORDER
    case actionTypes.CREATE_REQUEST_REQUEST:
      
      return {
        ...state,
        loading: true,
        error: ''
      };
    case actionTypes.CREATE_REQUEST_SUCCESS:
      // console.log(action.payload)
      return {
        ...state,
        loading: false,
        request: action.payload,
        requests: { fetchedRequests: [...state.requests.fetchedRequests, action.payload], count: state.requests.count+1 },
        requestsCount: state.requestsCount+1

      };
    case actionTypes.CREATE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  
//DELETE REQUEST
case actionTypes.DELETE_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error:''
      };
    case actionTypes.DELETE_REQUEST_SUCCESS:
      const updatedListAfterDelete= state.requests.fetchedRequests.filter(request=> request._id!==action.payload)
      return {
        ...state,
        loading: false,
        requests: {fetchedRequests: updatedListAfterDelete, count: state.requests.count - 1},
        requestsCount: state.requestsCount-1
      };
    case actionTypes.DELETE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      // GET TOTAL REQUEST COUNT
    case actionTypes.GET_TOTAL_REQUESTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_TOTAL_REQUESTS_SUCCESS:
      
      return {
        ...state,
        requestsCount: action.payload,
        loading: false,
      };
    case actionTypes.GET_TOTAL_REQUESTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};