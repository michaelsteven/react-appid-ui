import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import { sendRequest } from "../../common/sendRequest";
import ForgotPasswordForm, { FormData } from "./ForgotPasswordForm";

const forgotPassword = async (username: string) => {
  return await sendRequest({
    url: "/api/v1/appid/forgotpwd",
    method: "POST",
    body: JSON.stringify({ username: username }),
  });
};

export function ForgotPasswordPage() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const { t } = useTranslation("appid");

  const handleSubmit = (formData: FormData) => {
    const { username } = formData;
    if (username) {
      forgotPassword(username).then(async (response) => {
        if (response && response.status >= 200 && response.status < 300) {
          await response.json();
          setShowForm(false);
        } else {
          const { message } = response ? await response.json() : "An unknown error occurred";
          setError(message);
          console.log(error);
        }
      });
    }
  };

  return (
    <div className="page">
      <div>
        <div>
          <div className="title">{t("forgotpassword.page_title")}</div>
          {showForm ? (
            <>
              <div>{t("forgotpassword.instructions")}</div>
              <ForgotPasswordForm onSubmit={handleSubmit}></ForgotPasswordForm>
              <ErrorDisplay error={error} />
            </>
          ) : (
            <div>{t("forgotpassword.resetemailsent")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
