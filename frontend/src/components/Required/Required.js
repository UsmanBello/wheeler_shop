import React from "react";

const Required = ({ field, display }) => {
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

  return (
    field==='Terms and conditions'?
    <p style={messageStyle}>You have to accept terms and conditions to continue.</p> :
    field==='Images'? 
    <p style={messageStyle}>Image is required. You need at least one Image</p> :
    <p style={messageStyle}>
      {" "}
      <strong>{field}</strong> is required. Please enter a {field}.{" "}
    </p>
  );
};

export default Required;