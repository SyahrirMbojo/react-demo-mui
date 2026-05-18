import React from "react";
import UseIdle from "../hooks/UseIdle";
import { Navigate, Outlet } from "react-router-dom";

function AuthProtected() {
  const logout = () => {
    localStorage.clear();
  };
  const { isIdle } = UseIdle({ onIdle: logout, idleTime: 60 });

  return isIdle ? <Navigate to="login" /> : <Outlet />;
}

export default AuthProtected;
