import * as actionTypes from "../constants/authConstants";
import  axiosInstance,{setTokenHeader } from '../../utils/api'



export const setCurrentUser=(user)=>{
   return  {
        type: actionTypes.AUTH_USER_SUCCESS,
        payload: user
    }
}

export const setAuthorizationToken=(token)=>{
	setTokenHeader(token);
}

export const logout=()=>{
  
	return dispatch => {
		localStorage.removeItem("jwtToken");
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	}
}
// export const logout=()=> dispatch => {
//     console.log('in dispatch')
// 		localStorage.removeItem("jwtToken");
// 		setAuthorizationToken(false);
		// dispatch(setCurrentUser({}));
	
// }


export const  authUser=(type,userData)=> async(dispatch)=>{
  try{
    dispatch({ type: actionTypes.AUTH_USER_REQUEST });

    const { data } = await axiosInstance.post(`/api/auth/${type}`, userData)
    console.log(data)
    const {token, ...user}= data
    localStorage.setItem("jwtToken", token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(user))
}catch(error){
      console.log(error.response)
    dispatch({
        type: actionTypes.AUTH_USER_FAIL,
        payload: 
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
  }
}
	

