import sendRequest from "../../common/SendRequest";
import { Account } from "../model";

export function createAccount(account: Account) {
  return sendRequest({
    url: "/api/v1/appid/signup",
    method: "POST",
    body: JSON.stringify(account),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
