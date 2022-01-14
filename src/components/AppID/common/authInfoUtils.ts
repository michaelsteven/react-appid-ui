import { sendRequest } from "../../common/SendRequest";
import { AuthInfo } from "../model/AuthInfo";

export const getAuthInfo = async (): Promise<AuthInfo | undefined> => {
  const authInfo = getAuthInfoFromStorage();
  if (authInfo) {
    if (isAuthInfoExpired(authInfo)) {
      console.log("auth ticket is expired, attempting renewal");
      const newAuthInfo = await renewToken();
      if (!newAuthInfo) {
        deleteAuthInfoFromStorage();
      }
      return newAuthInfo;
    }
    return authInfo;
  }
  return undefined;
};

const getAuthInfoFromStorage = (): AuthInfo | undefined => {
  const authString = sessionStorage.getItem("auth");
  if (authString) {
    const authInfo = JSON.parse(authString) as AuthInfo;
    return authInfo;
  }
  return undefined;
};

const deleteAuthInfoFromStorage = (): void => {
  sessionStorage.removeItem("auth");
};

const isAuthInfoExpired = (authInfo: AuthInfo): boolean => {
  if (authInfo) {
    const { exp } = authInfo;
    return Date.now() >= exp * 1000 ? true : false;
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
  const authInfo = await getAuthInfo();
  if (authInfo) {
    const { scope } = authInfo;
    const scopeArray = scope.split(" ");
    return scopeArray.filter((item) => appidScopesArray.indexOf(item) === -1);
  }
  return [];
};

export const containsScope = async (scope: string): Promise<boolean> => {
  const authInfo = await getAuthInfo();
  if (authInfo) {
    const { scope: scopes } = authInfo;
    if (scopes) {
      const scopeArray = scopes.split(" ");
      return scopeArray.includes(scope) ? true : false;
    }
  }
  return false;
};

export const scopeHasOneOf = async (scopeArray: Array<string>): Promise<boolean> => {
  const authInfo = await getAuthInfo();
  if (authInfo) {
    const { scope: scopes } = authInfo;
    if (scopes) {
      for (var scope of scopeArray) {
        if (scopes.includes(scope)) {
          return true;
        }
      }
    }
  }
  return false;
};

export const scopeHasAllOf = async (scopeArray: Array<string>): Promise<boolean> => {
  const authInfo = await getAuthInfo();
  if (authInfo) {
    const { scope: scopes } = authInfo;
    if (scopes) {
      for (var scope of scopeArray) {
        if (!scopes.includes(scope)) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
};

const renewToken = async (): Promise<AuthInfo> => {
  const options = {
    url: "/api/v1/appid/login/refresh",
    method: "POST",
  };
  const promise = await sendRequest(options);
  const json = await promise.json();
  sessionStorage.setItem("auth", JSON.stringify(json));
  return json;
};
