import React from "react";
import { Route, Routes } from "react-router-dom";

import SignUp from "../Pages/Signup";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/Forgetpassword";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import HomeControl from "../Control/HomeControl/HomeControl";
import NotFound from "../NotFound/NotFound";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forget" element={<ForgetPassword />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomeControl />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
