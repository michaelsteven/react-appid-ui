import jwtDecode from "jwt-decode";
import { AccessToken, AuthToken } from "../model";
import { sendRequest } from "../../common/sendRequest";

export const getEncodedAccessToken = async (): Promise<string> => {
  const authToken = getAuthTokenFromStorage();
  if (authToken) {
    const { access_token: accessToken, refresh_token: refreshToken } = authToken;
    if (isTokenExpired(accessToken)) {
      console.log("access token is expired");
      if (isTokenExpired(refreshToken)) {
        console.log("refresh token expired");
        deleteAuthTokenFromStorage();
      } else {
        console.log("renewing access token");
        const renewedAccesstoken = await renewToken(refreshToken, accessToken);
        const { access_token: refreshedAccessToken } = renewedAccesstoken;
        return refreshedAccessToken;
      }
    }
    return accessToken;
  }
  return "";
};

export const getAccessToken = async (): Promise<AccessToken> => {
  const encodedAccessToken = await getEncodedAccessToken();
  return jwtDecode<AccessToken>(encodedAccessToken);
};

const getAuthTokenFromStorage = (): AuthToken | undefined => {
  const authString = sessionStorage.getItem("auth");
  if (authString) {
    const authToken = JSON.parse(authString);
    return authToken;
  }
  return undefined;
};

const deleteAuthTokenFromStorage = (): void => {
  sessionStorage.removeItem("auth");
};

const isTokenExpired = (token: string): boolean => {
  if (token) {
    try {
      const { exp } = jwtDecode<any>(token);
      return Date.now() >= exp * 1000 ? true : false;
    } catch {
      console.log(`error while decoding token: ${token}`);
    }
  }
  return true;
};

const appidScopesArray = [
  "openid",
  "appid_default",
  "appid_readuserattr",
  "appid_readprofile",
  "appid_writeuserattr",
  "appid_authenticated",
];

export const getApplicationScopes = async (): Promise<Array<string>> => {
  const token = await getAccessToken();
  const { scope } = token;
  const scopeArray = scope.split(" ");
  return scopeArray.filter((item) => appidScopesArray.indexOf(item) === -1);
};

export const containsScope = async (scope: string): Promise<boolean> => {
  const token = await getAccessToken();
  const { scope: scopes } = token;
  if (scopes) {
    const scopeArray = scopes.split(" ");
    return scopeArray.includes(scope) ? true : false;
  }
  return false;
};

export const scopeHasOneOf = async (scopeArray: Array<string>): Promise<boolean> => {
  const token = await getAccessToken();
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

export const scopeHasAllOf = async (scopeArray: Array<string>): Promise<boolean> => {
  const token = await getAccessToken();
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

const renewToken = async (refreshToken: string, accessToken: string): Promise<AuthToken> => {
  const options = {
    url: "/api/v1/appid/login/refresh",
    method: "POST",
    body: JSON.stringify({ refreshToken: refreshToken, accessToken: accessToken }),
  };
  const promise = await sendRequest(options);
  const json = await promise.json();
  sessionStorage.setItem("auth", JSON.stringify(json));
  return json;
};
