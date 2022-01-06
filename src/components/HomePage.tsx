import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "./common/ErrorDisplay";
import sendRequest from "./common/SendRequest";
import useAuth from "./AppID/hooks/useAuth";

export default function HomePage() {
  const { t } = useTranslation("pages");
  const [error, setError] = useState<unknown>();
  const { auth } = useAuth();

  const handleClick = async () => {
    setError(""); // clears past errors
    // TODO centralize logic for getting access token
    // TODO code the renewing of the access token from the refresh token if it is expired
    const { access_token: accessToken } = auth;
    const response = await sendRequest({
      url: "/api/v1/sample/sayhello",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      alert(JSON.stringify(await response.json()));
    } else {
      setError(response.statusText);
    }
  };

  return (
    <div className="page">
      <div className="title">{t("homepage.title")}</div>
      <div>{t("homepage.instructions")}</div>
      <div>
        <button onClick={handleClick}>Make test call to a token secured endpoint</button>
        <ErrorDisplay error={error} />
      </div>
    </div>
  );
}
