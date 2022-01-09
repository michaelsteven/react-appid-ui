import i18next from "i18next";
import { getEncodedAccessToken } from "./TokenUtils";

type SendRequestOptions = {
  url: string;
  method: string;
  body?: string;
  headers?: any;
  credentials?: any;
};

export async function sendRequest(options: SendRequestOptions) {
  const _headers = {
    "Content-Type": "application/json",
    "Cache-Control": "No-Store",
    "Accept-Language": i18next.language,
  };

  const defaults = { headers: _headers };
  console.log(JSON.stringify(_headers));
  const extendedOptions = Object.assign({}, defaults, options);
  console.log(JSON.stringify(extendedOptions));
  return fetch(extendedOptions.url, extendedOptions);
}

export const sendRequestWithAuth = async (options: SendRequestOptions) => {
  const token = getEncodedAccessToken();
  console.log(token);
  console.log(JSON.stringify(token));
  const _headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Cache-Control": "No-Store",
    "Accept-Language": i18next.language,
  };

  const defaults = { headers: _headers };
  const extendedOptions = Object.assign({}, defaults, options);
  return fetch(extendedOptions.url, extendedOptions);
};
