import { useState } from "react";

export default function useAccessToken() {
  const getAccessToken = () => {
    const tokenString = sessionStorage.getItem("accessToken");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    }
  };

  const [token, setToken] = useState(getAccessToken());

  const saveToken = (accessToken: { token: any }) => {
    sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
    setToken(accessToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
