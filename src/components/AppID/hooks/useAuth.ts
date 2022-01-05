import { useState } from "react";

export default function useAuth() {
  const getAuth = () => {
    const authString = sessionStorage.getItem("auth");
    return authString ? JSON.parse(authString) : "";
  };

  const [auth, setAuth] = useState(getAuth());

  const saveAuth = (authJson?: { token: any }) => {
    authJson
      ? sessionStorage.setItem("auth", JSON.stringify(authJson))
      : sessionStorage.removeItem("auth");
    setAuth(authJson);
  };

  return {
    setAuth: saveAuth,
    auth,
  };
}
