import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );

  const loggeddata = JSON.parse(localStorage.getItem("userlogged"));
  // console.log("======private loggeddata=====",loggeddata === null ? "true" :"false" )

  const Auth = loggeddata !== null 

  return Auth ? children : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
