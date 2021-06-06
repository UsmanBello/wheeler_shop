import * as actionTypes from "../constants/authConstants";
export const currentUser = (state = { user: {}, isAuthenticated: false, loading: true, error: ''}, action) => {
  switch (action.type) {
    //GET CUSTOMERS
    case actionTypes.AUTH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }; 
    case actionTypes.AUTH_USER_SUCCESS:
      
      return {
        ...state,
        loading: false,
        isAuthenticated: Object.keys(action.payload).length>0,
        user: action.payload
      };
    case actionTypes.AUTH_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// if(localStorage.jwtToken){//if there is a token
// 	setAuthorizationToken(localStorage.jwtToken) // add the token to the header of requests----
// //we also want 2 prevent someone from manually tampering with the key from the key of jwtToken in d localStorage
// 	try{
// 		//we try and decode the payload to see if it matches current user
// 		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
// 	}catch(e){// if they manually change the key, we log them out by force
// 		store.dispatch(setCurrentUser({}))
//     }
// }

// if(localStorage.jwtToken){
// 	setAuthorizationToken(localStorage.jwtToken) 
// 	try{
// 		if( jwtDecode(localStorage.jwtToken).exp > Math.floor(new Date().getTime() / 1000)){
			
// 			store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
// 		}else{
// 			store.dispatch(setCurrentUser({}))
// 		}
// 	}catch(e){
// 		store.dispatch(setCurrentUser({}))
		
//     }
// }