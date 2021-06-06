import * as actionTypes from "../constants/customerConstants";
export const customer = (state = { customers: {fetchedCustomers: [], count:0},customersCount: 0, customer: {}, loading: true, error: '' }, action) => {
  switch (action.type) {
    //GET CUSTOMERS
    case actionTypes.GET_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: {fetchedCustomers: action.payload.customers ,count: action.payload.count},
        loading: false,
      };
    case actionTypes.GET_CUSTOMERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //GET CUSTOMERS DETAIL
    case actionTypes.GET_CUSTOMER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };
    case actionTypes.GET_CUSTOMER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_CUSTOMER_DETAILS_RESET:
      return {
        ...state,
        customer: {},
      };
      //CREATE CUSTOMER
    case actionTypes.CREATE_CUSTOMER_REQUEST:
      
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_CUSTOMER_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        customers: { fetchedCustomers: [...state.customers.fetchedCustomers, action.payload], count: state.customers.count + 1},
        customersCount: state.customersCount+1
      };
    case actionTypes.CREATE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
   //UPDATE CUSTOMER
    case actionTypes.UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_CUSTOMER_SUCCESS:
      const updatedList= state.customers.fetchedCustomers.map(customer=>{
        if(customer._id===action.payload._id){
          return action.payload
        }
        return customer
      })
      return {
        ...state,
        loading: false,
        customers: { fetchedCustomers: updatedList, count: state.customers.count }
      };
    case actionTypes.UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  
//DELETE CUSTOMERS
case actionTypes.DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_CUSTOMER_SUCCESS:
      const updatedListAfterDelete= state.customers.fetchedCustomers.filter(customer=> customer._id!==action.payload)
      return {
        ...state,
        loading: false,
        customers: {fetchedCustomers: updatedListAfterDelete, count: state.customers.count - 1},
        customersCount: state.customersCount-1
      };
    case actionTypes.DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      // GET TOTAL CUSTOMERS COUNT
    case actionTypes.GET_TOTAL_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
        
      };
    case actionTypes.GET_TOTAL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customersCount: action.payload,
        loading: false,
      };
    case actionTypes.GET_TOTAL_CUSTOMERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};