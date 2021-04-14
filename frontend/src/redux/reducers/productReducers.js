import * as actionTypes from "../constants/productConstants";
export const product = (state = { products: [], product: {}, loading: true, error: '' }, action) => {
  switch (action.type) {
    //GET PRODUCT
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        products: [],
        loading: true,
        
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //GET PRODUCT DETAIL
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        // product:{}
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        ...state,
        product: {},
      };
      //CREATE PRODUCT
    case actionTypes.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case actionTypes.CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
   //UPDATE
    case actionTypes.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      const updatedList= state.products.map(product=>{
        if(product._id===action.payload._id){
          return action.payload
        }
        return product
      })
      return {
        ...state,
        loading: false,
        products: updatedList,
      };
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  
//DELETE PRODUCT
case actionTypes.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      const updatedListAfterDelete= state.products.filter(product=> product._id!==action.payload._id)
      return {
        ...state,
        loading: false,
        products: updatedListAfterDelete,
      };
    case actionTypes.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
//////////////////////////////////
// import * as actionTypes from "../constants/productConstants";

// export const getProductsReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case actionTypes.GET_PRODUCTS_REQUEST:
//       return {
//         loading: true,
//         products: [],
//       };
//     case actionTypes.GET_PRODUCTS_SUCCESS:
//       return {
//         products: action.payload,
//         loading: false,
//       };
//     case actionTypes.GET_PRODUCTS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const getProductDetailsReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
//       return {
//         loading: true,
//       };
//     case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         product: action.payload,
//       };
//     case actionTypes.GET_PRODUCT_DETAILS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case actionTypes.GET_PRODUCT_DETAILS_RESET:
//       return {
//         product: {},
//       };
//     default:
//       return state;
//   }
// };

// export const createProductReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case actionTypes.CREATE_PRODUCT_REQUEST:
//       return {
//         loading: true,
//       };
//     case actionTypes.CREATE_PRODUCT_SUCCESS:
//       return {
//         loading: false,
//         products: [...state.products, action.payload],
//       };
//     case actionTypes.UPDATE_PRODUCT_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const updateProductReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case actionTypes.UPDATE_PRODUCT_REQUEST:
//       return {
//         loading: true,
//       };
//     case actionTypes.UPDATE_PRODUCT_SUCCESS:
//       const updatedList= state.products.map(product=>{
//                 if(product._id===action.payload._id){
//                   return action.payload
//                 }
//                 return product
//         })
//         return {
//                 loading: false,
//                 products: updatedList,
//               };
//     case actionTypes.UPDATE_PRODUCT_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const deleteProductReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case actionTypes.DELETE_PRODUCT_REQUEST:
//       return {
//         loading: true,
//       };
//     case actionTypes.DELETE_PRODUCT_SUCCESS:
//       const updatedList= state.products.filter(product=>product._id!==action.payload._id)
//         return {
//           loading: false,
//           products: updatedList,
//       };
//     case actionTypes.DELETE_PRODUCT_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };