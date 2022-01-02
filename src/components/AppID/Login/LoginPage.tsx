import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import { Credentials } from "../model";
import LoginForm from "./LoginForm";
import { login } from "../../../api/LoginApi";
import Cookies from "universal-cookie";
import { getAllByPlaceholderText } from "@testing-library/react";

export default function LoginPage() {
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
            const json = await response.json();
            console.log(json);
            console.log(response);
            const { message } = json;
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
        </div>
      </div>
    </div>
  );
}
