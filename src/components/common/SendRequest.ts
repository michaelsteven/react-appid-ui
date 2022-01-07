import i18next from "i18next";

type SendRequestOptions = {
  url: string;
  method: string;
  body?: string;
  headers?: any;
  credentials?: any;
};

export default async function sendRequest(options: SendRequestOptions) {
  const _headers = new Headers({
    "Content-Type": "application/json",
    "Cache-Control": "No-Store",
    "Accept-Language": i18next.language,
  });

  const defaults = { headers: _headers };
  const extendedOptions = Object.assign({}, defaults, options);
  alert(JSON.stringify(extendedOptions));
  return fetch(extendedOptions.url, extendedOptions);
}
