import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import AccountForm from "./SignupForm";
import { Account } from "../model";
import { createAccount } from "./api";
import { CloudDirectoryUser } from "../model/CloudDirectoryUser";

export function SignupPage() {
  const [showForm, setShowForm] = useState<boolean>(true);
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
      createAccount("", account)
        .then(async (response) => {
          console.log(response);
          if (response.status === 200) {
            const json: CloudDirectoryUser = await response.data;
            json.status === "PENDING" ? setShowForm(false) : navigate("/");
          } else {
            const { message } = await response.data;
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
          {showForm ? (
            <>
              <AccountForm onSubmit={handleSubmit} />
              <ErrorDisplay error={error} />
            </>
          ) : (
            <>
              <div>{t("signup.pending")}</div>
              <Link to="/login">{t("signup.login")}</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
