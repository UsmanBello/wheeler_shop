import * as actionTypes from "../constants/productConstants";
export const product = (state = {
   products: {fetchedProducts: [], count:0},
   someProducts: [],
   relatedProducts: [],
  productsCount: 0,
  outOfStockCount: 0,
  product:{  name:'', description: '', price: 0, brand:'', countInStock: 0, productId: '', images: [{image: '',imageId: ''}], category: '', subCategory: '', sales: 0
	 },
   brands: [],
   loading: true,
    loadingProducts: true, 
    loadingProductsCount: true,
    error: '' },
     action) => {


  switch (action.type) {
    //GET PRODUCTS
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingProducts: true,
        error:''
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {fetchedProducts: action.payload.products ,count: action.payload.count},
        loadingProducts: false,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        ...state,
        loadingProducts: false,
        error: action.payload,
      };
    //GET SOME PRODUTS 
    case actionTypes.GET_SOME_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error:''
      };
    case actionTypes.GET_SOME_PRODUCTS_SUCCESS:
      return {
        ...state,
        someProducts: action.payload,
        loading: false,
      };
    case actionTypes.GET_SOME_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  // GET RELATED PRODUCTS ----> JUST 3 PRODUCTS 
     case actionTypes.GET_RELATED_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        
      };
    case actionTypes.GET_RELATED_PRODUCTS_SUCCESS:
      return {
        ...state,
        relatedProducts: action.payload,
        loading: false,
      };
    case actionTypes.GET_RELATED_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
	  case actionTypes.GET_RELATED_PRODUCT_DETAILS_RESET:
		  return {
        ...state,
        relatedProducts: [],
        loading: false,
      };
    //GET PRODUCT DETAIL
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product:  action.payload
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
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        products: { fetchedProducts: [...state.products.fetchedProducts, action.payload], count: state.products.count + 1 },
        productsCount: state.productsCount+1
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
      const updatedList= state.products.fetchedProducts.map(product=>{
        if(product._id===action.payload._id){
          return action.payload
        }
        return product
      })
      return {
        ...state,
        loading: false,
        products: { fetchedProducts: updatedList, count: state.products.count }
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
      const updatedListAfterDelete= state.products.fetchedProducts.filter(product=> product._id!==action.payload._id)
      return {
        ...state,
        loading: false,
        products: { fetchedProducts: updatedListAfterDelete, count: state.products.count - 1},
        productsCount: state.productsCount-1
      };
    case actionTypes.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      //GET OUT OF STOCK COUNT 
      case actionTypes.GET_OUT_OF_STOCK_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
        
      };
    case actionTypes.GET_OUT_OF_STOCK_COUNT_SUCCESS:
      return {
        ...state,
        outOfStockCount: action.payload,
        loading: false,
      };
    case actionTypes.GET_OUT_OF_STOCK_COUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      // GET TOTAL PRODUCTS COUNT
    case actionTypes.GET_TOTAL_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingProductsCount: true,
        
      };
    case actionTypes.GET_TOTAL_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsCount: action.payload,
        loadingProductsCount: false,
      };
    case actionTypes.GET_TOTAL_PRODUCTS_FAIL:
      return {
        ...state,
        loadingProductsCount: false,
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