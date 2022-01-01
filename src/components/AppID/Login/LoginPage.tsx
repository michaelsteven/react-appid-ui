import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import { Credentials } from "../model";
import LoginForm from "./LoginForm";
import { login } from "../../../api/LoginApi";
import Cookies from "universal-cookie";

export default function LoginPage() {
  const [error, setError] = useState<unknown>();
  const { t } = useTranslation("appid");
  const navigate = useNavigate();

  const handleSubmit = (credentials: Credentials) => {
    if (credentials) {
      credentials.redirectUri = "http://localhost:8080";
      login(credentials)
        .then((token) => {
          const { expires_in } = JSON.parse(token);
          const cookies = new Cookies();
          cookies.set("session_token", token, {
            path: "/",
            expires: new Date(new Date().getTime() + expires_in),
          });
          navigate("/");
          window.location.reload();
        })
        .catch((error: any) => {
          setError(error.error);
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
        </div>
      </div>
    </div>
  );
}
