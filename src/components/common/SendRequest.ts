import i18next from "i18next";
import jwtDecode from "jwt-decode";

type SendRequestOptions = {
  url: string;
  method: string;
  body?: string;
  headers?: any;
  credentials?: any;
};

export async function sendRequest(options: SendRequestOptions) {
  const _headers = new Headers({
    "Content-Type": "application/json",
    "Cache-Control": "No-Store",
    "Accept-Language": i18next.language,
  });

  const defaults = { headers: _headers };
  const extendedOptions = Object.assign({}, defaults, options);
  return fetch(extendedOptions.url, extendedOptions);
}

export const sendRequestWithAuth = async (options: SendRequestOptions) => {
  let token = getToken();

  const _headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Cache-Control": "No-Store",
    "Accept-Language": i18next.language,
  });

  const defaults = { headers: _headers };
  const extendedOptions = Object.assign({}, defaults, options);
  return fetch(extendedOptions.url, extendedOptions);
};

const getToken = (): any => {
  const authToken = getAuthTokenFromStorage();
  const { access_token: accessToken, refresh_token: refreshToken } = authToken;
  if (isTokenExpired(accessToken)) {
    alert("access token is expired");
    if (isTokenExpired(refreshToken)) {
      // redirect to login?
      alert("refresh token expired");
    } else {
      // get the refresh token
    }
  }
  return accessToken;
};

const getAuthTokenFromStorage = (): any => {
  const authString = sessionStorage.getItem("auth");
  if (authString) {
    const authToken = JSON.parse(authString);
    return authToken;
  }
};

const isTokenExpired = (token: string): boolean => {
  const { exp } = jwtDecode<any>(token);
  return Date.now() >= exp * 1000 ? true : false;
};
