import sendRequest from "./SendRequest";
import { Credentials } from "../components/AppID/model";

export function login(credentials: Credentials) {
  return sendRequest({
    url: "/api/v1/appid/login",
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
