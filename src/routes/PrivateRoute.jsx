import React from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ permissons, children }) => {
  const cookies = new Cookies();
  let user = cookies.get("user");
  if (user) {
    if (permissons.includes(user.role)) {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
