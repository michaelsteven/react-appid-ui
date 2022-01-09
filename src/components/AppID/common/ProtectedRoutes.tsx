import React, { useState } from "react";
import { Outlet } from "react-router";
import { LoginPage } from "..";
import useAuth from "./useAuth";
import { scopeHasOneOf, scopeHasAllOf } from "./tokenUtils";

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
        scopeHasOneOf(oneOfRoles).then((result: boolean) => {
          setElement(result ? <Outlet /> : <LoginPage />);
        });
      } else if (hasAllRoles) {
        scopeHasAllOf(hasAllRoles).then((result: boolean) => {
          setElement(result ? <Outlet /> : <LoginPage />);
        });
      } else {
        return auth ? <Outlet /> : <LoginPage />;
      }
    }
    return element;
  }
  return auth ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoutes;
