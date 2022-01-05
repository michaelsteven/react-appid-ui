import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import { Credentials } from "../model";
import LoginForm from "./LoginForm";
import sendRequest from "../../common/SendRequest";

export function login(credentials: Credentials) {
  return sendRequest({
    url: "/api/v1/appid/login",
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(credentials),
  });
}

export function LoginPage() {
  const [error, setError] = useState<unknown>();
  const { t } = useTranslation("appid");
  const navigate = useNavigate();

  const handleSubmit = (credentials: Credentials) => {
    if (credentials) {
      login(credentials)
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
        .catch((error: any) => {
          setError(error);
          console.log(error);
        });
    }
  };

  return (
    <div className="page">
      <div>
        <div>
          <div className="title">{t("login.page_title")}</div>
          <LoginForm onSubmit={handleSubmit}></LoginForm>
          <ErrorDisplay error={error} />
          <div>
            <Link to="/lostpassword">{t("login.forgotpassword")}</Link>
          </div>
          <div>
            <Link to="/signup">{t("login.createaccount")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
