import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { LoginPage } from "..";
import useAuth from "./useAuth";
import { scopeHasOneOf, scopeHasAllOf } from "./authInfoUtils";

type Props = {
  hasAllRoles?: Array<string>;
  oneOfRoles?: Array<string>;
};

const ProtectedRoutes = (props: Props) => {
  const [element, setElement] = useState<any>(<LoginPage />);
  const { hasAllRoles, oneOfRoles } = props;
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      if (oneOfRoles) {
        scopeHasOneOf(oneOfRoles).then((result: boolean) => {
          setElement(result ? <Outlet /> : <LoginPage />);
        });
      } else if (hasAllRoles) {
        scopeHasAllOf(hasAllRoles).then((result: boolean) => {
          setElement(result ? <Outlet /> : <LoginPage />);
        });
      } else {
        setElement(<Outlet />);
      }
    } else {
      setElement(<LoginPage />);
    }
  }, [auth, hasAllRoles, oneOfRoles]);

  return <>{element}</>;
};

export default ProtectedRoutes;
