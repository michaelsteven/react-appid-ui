import sendRequest from "./SendRequest";

type Account = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

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
