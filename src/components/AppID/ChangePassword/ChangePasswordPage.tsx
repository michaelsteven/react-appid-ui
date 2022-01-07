import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import sendRequest from "../../common/SendRequest";
import ChangePasswordForm from "./ChangePasswordForm";
import useAuth from "../hooks/useAuth";

export function ChangePasswordPage() {
  const { t } = useTranslation("appid");
  const [showForm, setShowForm] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const { auth } = useAuth();

  function changePassword(newPassword: string) {
    const { access_token: accessToken } = auth;
    const options = {
      url: "/api/v1/appid/changepwd",
      method: "POST",
      body: JSON.stringify({ newPassword: newPassword }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Cache-Control": "No-Store",
      },
    };
    return sendRequest(options);
  }

  const handleSubmit = (payload: { newPassword: string; reenterPassword?: string }) => {
    if (payload) {
      const { newPassword } = payload;
      changePassword(newPassword)
        .then(async (response) => {
          if (response.ok) {
            // const json = await response.json();
            setShowForm(false);
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
