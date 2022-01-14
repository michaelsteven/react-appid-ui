import React, { useMemo, useState } from "react";
import { Outlet } from "react-router";
import useAuth from "./useAuth";
import { scopeHasOneOf, scopeHasAllOf } from "./authInfoUtils";
import { LoginPage } from "../Login";

type Props = {
  hasAllRoles?: Array<string>;
  oneOfRoles?: Array<string>;
};

const ProtectedRoutes = (props: Props) => {
  const [element, setElement] = useState<any>(<LoginPage />);
  const { hasAllRoles, oneOfRoles } = props;
  const { auth } = useAuth();

  useMemo(() => {
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

  return element;
};

export default ProtectedRoutes;
