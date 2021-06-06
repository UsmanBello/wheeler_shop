import React from 'react'
import { Route, useLocation } from "react-router-dom";
import {useSelector } from "react-redux";

//COMPONENT
import NotFound from '../components/NotFound/NotFound'

const ProtectedRoutes= ({component: Component, ...rest }) => {

    const location=useLocation()
    
    const currentUser= useSelector(state=>state.currentUser)
    const { isAuthenticated, loading } = currentUser
    
  return (
    <Route
      {...rest}
      render={(props) => {
        
        if (isAuthenticated === true) {
          return <Component currentUser={currentUser} {...props} />;
        } else {
          return (
          <NotFound/>
          );
        }
      }}
    />
  );
};

export default ProtectedRoutes