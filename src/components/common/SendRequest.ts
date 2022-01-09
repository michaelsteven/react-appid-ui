import i18next from "i18next";
import { getEncodedAccessToken } from "../AppID/common/tokenUtils";

type SendRequestOptions = {
  url: string;
  method: string;
  body?: string;
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
  const token = await getEncodedAccessToken();
  const authHeaders = Object.assign({}, getDefaultHeaders(), { Authorization: `Bearer ${token}` });
  const extendedOptions = Object.assign({}, { headers: authHeaders }, options);
  return fetch(extendedOptions.url, extendedOptions);
};
