import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import ChangePasswordForm from "./ChangePasswordForm";
import { sendRequestWithAuth } from "../../common/sendRequest";

export function ChangePasswordPage() {
  const { t } = useTranslation("appid");
  const [showForm, setShowForm] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();

  function changePassword(newPassword: string) {
    const options = {
      url: "/api/v1/appid/changepwd",
      method: "POST",
      body: JSON.stringify({ newPassword: newPassword }),
    };
    return sendRequestWithAuth(options);
  }

  const handleSubmit = (payload: { newPassword: string; reenterPassword?: string }) => {
    if (payload) {
      const { newPassword } = payload;
      changePassword(newPassword)
        .then(async (response) => {
          if (response.ok) {
            setShowForm(false);
          } else {
            const { message } = await response.json();
            setError(message);
          }
        })
        .catch((error1) => {
          setError(error1.error);
        });
    }
  };

  return (
    <div className="page">
      <div className="title">{t("changepassword.page_title")}</div>
      {showForm ? (
        <>
          <ChangePasswordForm onSubmit={handleSubmit}></ChangePasswordForm>
          <ErrorDisplay error={error} />
        </>
      ) : (
        <div>{t("changepassword.passwordchanged")}</div>
      )}
    </div>
  );
}
