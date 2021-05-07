import * as actionTypes from "../constants/orderConstants";
export const order = (state = { 
    orders: {fetchedOrders: [], count:0},
    ordersCount: 0,
    order: {},
    customerOrders: [],
    loading: true, 
    error: '' },
     action) => {
  switch (action.type) {
    //GET ORDERS
    case actionTypes.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        orders: {fetchedOrders: action.payload.orders ,count: action.payload.count},
        loading: false,
      };
    case actionTypes.GET_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //GET ORDERS DETAIL
    case actionTypes.GET_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case actionTypes.GET_ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_ORDER_DETAILS_RESET:
      return {
        ...state,
        order: {},
      };
      //GET ORDERS BY ONE CUSTOMER --->ORDERS_BY_CUSTOMER
      case actionTypes.GET_ORDERS_BY_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ORDERS_BY_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customerOrders: action.payload,
      };
    case actionTypes.GET_ORDERS_BY_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_ORDERS_BY_CUSTOMER_RESET:
      return {
        ...state,
        customerOrders: {},
      };
      //CREATE ORDER
    case actionTypes.CREATE_ORDER_REQUEST:
      
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_ORDER_SUCCESS:
      // console.log(action.payload)
      return {
        ...state,
        loading: false,
        order: action.payload,
        orders: { fetchedOrders: [...state.orders.fetchedOrders, action.payload], count: state.orders.count+1 },
      };
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
   //UPDATE ORDER
    case actionTypes.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_ORDER_SUCCESS:
      const updatedList= state.orders.fetchedOrders.map(order=>{
        if(order._id===action.payload._id){
          return action.payload
        }
        return order
      })
      return {
        ...state,
        loading: false,
        orders: { fetchedOrders: updatedList, count: state.orders.count }
      };
    case actionTypes.UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  
//DELETE ORDERS
case actionTypes.DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_ORDER_SUCCESS:
      const updatedListAfterDelete= state.orders.fetchedOrders.filter(order=> order._id!==action.payload._id)
      return {
        ...state,
        loading: false,
        orders: {fetchedOrders: updatedListAfterDelete, count: state.orders.count - 1/* GET THE REAL VALUE */}
      };
    case actionTypes.DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      // GET TOTAL ORDERS COUNT
    case actionTypes.GET_TOTAL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        
      };
    case actionTypes.GET_TOTAL_ORDERS_SUCCESS:
      console.log(action.payload)
      
      return {
        ...state,
        ordersCount: action.payload,
        loading: false,
      };
    case actionTypes.GET_TOTAL_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};