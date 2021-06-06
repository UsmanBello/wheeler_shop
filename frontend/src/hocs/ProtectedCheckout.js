import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes= ({component: Component, ...rest }) => {
    const cart = useSelector( state=> state.cart);
    const { cartItems } = cart
  return (
    <Route
      {...rest}
      render={(props) => {
          console.log(cartItems.length)
        if (cartItems.length >0 || props.location.state) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={'/cart'}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoutes