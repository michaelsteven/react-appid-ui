import { Locale } from ".";

interface RequestOptions {
  count?: number;
}

export interface Locales {
  totalResults: number;
  itemsPerPage: number;
  requestOptions: RequestOptions;
  locales: Array<Locale>;
}
