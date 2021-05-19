import React from "react";

const Invalid = ({ field, display }) => {
  var messageStyle;

  if (display === true) {
    messageStyle = {
      fontSize: "12px",
      color: "red",
      display: "block",
    };
  } else {
    messageStyle = {
      fontSize: "12px",
      color: "red",
      display: "none",
    };
  }
  const email = (
    <p style={messageStyle}><strong>Email</strong> is invalid. Please enter a valid email.</p>
  );
  const password = (
    <p style={messageStyle}>
      A password must be 8 characters Long. It should include atleast 1 number
      and 1 special character.
    </p>
  );
  const number = (<p style={messageStyle}><strong>Phone numbers</strong> muct contain only <strong>digits</strong>.</p>)
  const Qty = (<p  style={messageStyle}><strong>Quantity</strong> must contain only <strong>digits</strong>.</p>);
  const sales= (<p  style={messageStyle}><strong>Sales</strong> must contain only <strong>digits</strong>.</p>)
  const price= (<p  style={messageStyle}><strong>Price</strong> must contain only <strong>digits</strong>.</p>)

  return (
    <>
      {field === "Email" && email}
      {field === "Password" && password}
      {field === "Number" && number}
      {field==="Quantity" && Qty}
      {field==="sales" && sales}
      {field==="Price" && price}
    </>
  );
};

export default Invalid;