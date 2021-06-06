import axios from 'axios'

export function setTokenHeader(token){
  
	if(token){//when a user logs in, we ppass the token to all future requests
		axios.defaults.headers.common['Authorization']= `Bearer ${token}`
	} else{ //when a user logsout we delete the token
		delete axios.defaults.headers.common['Authorization'];
		
	}
}

const axiosInstance= axios.create({
  headers: { 
   'Content-Type': 'application/json',
  'Accept': 'application/json' }
})



axiosInstance.interceptors.request.use(
  (request) => {
    let token = localStorage.getItem("jwtToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
  }
 
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

