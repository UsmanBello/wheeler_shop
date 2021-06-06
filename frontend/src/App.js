import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import jwtDecode from 'jwt-decode'
import {setAuthorizationToken, setCurrentUser} from './redux/actions/authActions'
import store from './redux/store'


// Components
import Main from './components/Main/Main'

// Components
import Navbar from "./components/Navbar/Navbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import Footer from "./components/Footer/Footer";


if(localStorage.jwtToken){
	setAuthorizationToken(localStorage.jwtToken) 
	try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
		// if( jwtDecode(localStorage.jwtToken).exp > Math.floor(new Date().getTime() / 1000)){
		// 	console.log(jwtDecode(localStorage.jwtToken))
		// 	store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
		// }else{
		// 	store.dispatch(setCurrentUser({}))
		// }
	}catch(e){
		store.dispatch(setCurrentUser({}))
		
    }
}
console.log(store.getState())
// console.log(jwtDecode(localStorage.jwtToken))

function App() {

  const [sideToggle, setSideToggle]=useState(false)

  return (
    <Router>
       <div className='App'>
       <div className="content">
          <Navbar click={()=>setSideToggle(true)}/>
          <SideDrawer show={sideToggle} click={()=>setSideToggle(false)}/>
          <Backdrop show={sideToggle} click={()=>setSideToggle(false)}/>
            <Main/>
        </div>
          <Footer/>
     </div>
    </Router>
  
  );
}

export default App;
