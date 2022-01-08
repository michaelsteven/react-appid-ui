import i18next from "i18next";
import { getAccessToken } from "./TokenUtils";

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
  const token = getAccessToken();
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
