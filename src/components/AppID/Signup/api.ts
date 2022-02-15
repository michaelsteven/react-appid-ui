import { Account } from "../model";
import axios from "axios";

export function createAccount(baseUrl: string, account: Account) {
  return axios.request({
    method: "POST",
    baseURL: baseUrl,
    url: "/api/v1/appid/signup",
    headers: { Accept: "application/json" },
    data: account,
  });
}
