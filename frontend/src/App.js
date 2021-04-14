import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router} from "react-router-dom";

// Components
import Main from './components/Main/Main'

// Components
import Navbar from "./components/Navbar/Navbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import Footer from "./components/Footer/Footer"

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
