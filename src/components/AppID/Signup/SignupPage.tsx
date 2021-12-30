import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import AccountForm from "./SignupForm";
import { Account } from "../model";
import { createAccount } from "../../../api/CreateAccountApi";

export default function SignupPage() {
  const [error, setError] = useState<unknown>();
  const { t } = useTranslation("appid");

  const handleSubmit = (account: Account) => {
    if (account) {
      createAccount(account)
        .then((res) => {
          console.log(res);
          // TODO: move to the next page
        })
        .catch((error) => {
          setError(error.error);
          console.log(error);
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
