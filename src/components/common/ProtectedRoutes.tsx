import React, { useState } from "react";
import { Outlet } from "react-router";
import { LoginPage } from "../AppID";
import useAuth from "../AppID/hooks/useAuth";
import { scopeHasOneOf, scopeHasAllOf } from "../common/TokenUtils";

type Props = {
  hasAllRoles?: Array<string>;
  oneOfRoles?: Array<string>;
};

const ProtectedRoutes = (props: Props) => {
  const [element, setElement] = useState<any>();
  const { hasAllRoles, oneOfRoles } = props;
  const { auth } = useAuth();
  if (auth) {
    if (typeof element === "undefined") {
      if (oneOfRoles) {
        setElement(scopeHasOneOf(oneOfRoles) ? <Outlet /> : <LoginPage />);
      } else if (hasAllRoles) {
        setElement(scopeHasAllOf(hasAllRoles) ? <Outlet /> : <LoginPage />);
      } else {
        return auth ? <Outlet /> : <LoginPage />;
      }
    }
    return element;
  }
  return auth ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoutes;
