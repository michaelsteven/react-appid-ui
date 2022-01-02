import React from "react";
import { Outlet } from "react-router";
import Cookie from "universal-cookie";
import LoginPage from "../AppID/Login";

const useAuth = () => {
  const cookie = new Cookie();
  const authToken = cookie.get("authToken");
  return typeof authToken !== "undefined" ? true : false;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoutes;
