import jwtDecode from "jwt-decode";
import { AccessToken } from "../AppID/model/AccessToken";

export const getEncodedAccessToken = (): string => {
  const authToken = getAuthTokenFromStorage();
  const { access_token: accessToken, refresh_token: refreshToken } = authToken;
  if (isTokenExpired(accessToken)) {
    alert("access token is expired");
    if (isTokenExpired(refreshToken)) {
      // TODO redirect to login?
      alert("refresh token expired");
    } else {
      // TODO get the refresh token and renew the access token
    }
  }
  return accessToken;
};

export const getAccessToken = (): AccessToken => {
  const encodedAccessToken = getEncodedAccessToken();
  return jwtDecode<AccessToken>(encodedAccessToken);
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

const appidScopesArray = [
  "openid",
  "appid_default",
  "appid_readuserattr",
  "appid_readprofile",
  "appid_writeuserattr",
  "appid_authenticated",
];

export const getApplicationScopes = (): Array<string> => {
  const token = getAccessToken();
  const { scope } = token;
  const scopeArray = scope.split(" ");
  return scopeArray.filter((item) => appidScopesArray.indexOf(item) === -1);
};

export const containsScope = (scope: string): boolean => {
  const token = getAccessToken();
  const { scope: scopes } = token;
  if (scopes) {
    const scopeArray = scopes.split(" ");
    return scopeArray.includes(scope) ? true : false;
  }
  return false;
};

export const scopeHasOneOf = (scopeArray: Array<string>): boolean => {
  const token = getAccessToken();
  const { scope: scopes } = token;
  if (scopes) {
    for (var scope of scopeArray) {
      if (scopes.includes(scope)) {
        return true;
      }
    }
  }
  return false;
};

export const scopeHasAllOf = (scopeArray: Array<string>): boolean => {
  const token = getAccessToken();
  const { scope: scopes } = token;
  if (scopes) {
    for (var scope of scopeArray) {
      if (!scopes.includes(scope)) {
        return false;
      }
    }
    return true;
  }
  return false;
};
