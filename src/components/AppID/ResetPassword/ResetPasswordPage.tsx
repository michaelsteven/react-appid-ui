import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "../../common/ErrorDisplay";
import ResetPasswordForm from "./ResetPasswordForm";
import { sendRequest } from "../../common/sendRequest";

/*
  This page is designed to be accessed after clicking an email link that
  was generated when the user starts the Forgot Password email flow.

  The location of this page is entered at the bottom of the reset password 
  email template inside of the AppID Cloud Directory settings. 
  
  When the link is clicked a browser opens and directs them to appid.
  Appid will redirect the browser to this page, and a "context" query parameter
  will be added to the url.

  When this page is submitted, the context query parameter is used to 
  get the reset password result from App ID by using the
   /forgot_password/confirmation_result API.

  Here is the flow:
  forgotpassword page -> 
      email -> 
          user clicks link ->
              browser goes to appid ->
                  appid redirect here with a context querystring ->
                      user submit this page which will call the api ->
                          api validates context as valid and returns ->
                              if success=true an API call to ChangePassword is performed
*/

export function resetPassword(newPassword: string, context: string) {
  return sendRequest({
    url: "/api/v1/appid/forgotpwd/reset",
    method: "POST",
    body: JSON.stringify({ newPassword: newPassword, context: context }),
  });
}

export function getContext(): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("context") || "";
}

export function ResetPasswordPage() {
  // const { setAuth } = useAuth();
  const [showForm, setShowForm] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const { t } = useTranslation("appid");

  const handleSubmit = (payload: { newPassword: string; reenterpassword?: string }) => {
    if (payload) {
      const { newPassword } = payload;
      const context = getContext();
      resetPassword(newPassword, context)
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
      <div>
        <div className="title">{t("resetpassword.page_title")}</div>
        {showForm ? (
          <>
            <ResetPasswordForm onSubmit={handleSubmit}></ResetPasswordForm>
            <ErrorDisplay error={error} />
          </>
        ) : (
          <>
            <div>{t("resetpassword.success")}</div>
            <Link to="/login">{t("resetpassword.login")}</Link>
          </>
        )}
      </div>
    </div>
  );
}
