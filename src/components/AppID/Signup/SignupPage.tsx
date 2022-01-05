import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import sendRequest from "../../common/SendRequest";
import ErrorDisplay from "../../common/ErrorDisplay";
import AccountForm from "./SignupForm";
import { Account } from "../model";

export function createAccount(account: Account) {
  return sendRequest({
    url: "/api/v1/appid/signup",
    method: "POST",
    body: JSON.stringify(account),
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18next.language,
    },
  });
}

export function SignupPage() {
  const [error, setError] = useState<unknown>();
  const { t } = useTranslation("appid");
  const navigate = useNavigate();

  const handleSubmit = (
    account: Account & {
      reenterpassword?: string;
    }
  ) => {
    if (account) {
      delete account.reenterpassword;
      createAccount(account)
        .then(async (response) => {
          if (response && response.status >= 200 && response.status < 300) {
            await response.json();
            navigate("/");
            window.location.reload();
          } else {
            const { message } = await response.json();
            setError(message);
          }
        })
        .catch((error) => {
          setError(error.error);
        });
    }
  };

  return (
    <div className="page">
      <div>
        <div>
          <div className="title">{t("signup.page_title")}</div>
          <AccountForm onSubmit={handleSubmit}></AccountForm>
          <ErrorDisplay error={error} />
        </div>
      </div>
    </div>
  );
}
