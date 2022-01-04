import React from "react";
import { Outlet } from "react-router";
import Cookie from "universal-cookie";
import { LoginPage } from "../AppID";

const useAuth = () => {
  const cookie = new Cookie();
  const refreshToken = cookie.get("refresh_token");
  return typeof refreshToken !== "undefined" ? true : false;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoutes;
