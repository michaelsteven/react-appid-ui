import i18next from "i18next";
import { getAuthInfo } from "../AppID/common/authInfoUtils";

type SendRequestOptions = {
  url: string;
  method: string;
  body?: any;
  headers?: any;
  credentials?: any;
};

const getDefaultHeaders = (): {} => {
  return {
    "Content-Type": "application/json",
    "Cache-Control": "No-Store",
    "Accept-Language": i18next.language,
  };
};

export const sendRequest = async (options: SendRequestOptions): Promise<Response> => {
  const extendedOptions = Object.assign({}, { headers: getDefaultHeaders() }, options);
  return fetch(extendedOptions.url, extendedOptions);
};

export const sendRequestWithAuth = async (options: SendRequestOptions): Promise<Response> => {
  const authInfo = await getAuthInfo();
  if (authInfo) {
    const extendedOptions = Object.assign({}, { headers: getDefaultHeaders() }, options);
    return fetch(extendedOptions.url, extendedOptions);
  }
  return Promise.reject(new Error("Unable to obtain authorization info"));
};
