import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorDisplay from "./common/ErrorDisplay";
import { sendRequest } from "./common/SendRequest";

export default function HomePage() {
  const { t } = useTranslation("pages");
  const [error, setError] = useState<unknown>();

  const handleClick = async () => {
    setError(""); // clears past errors
    sendRequest({ url: "/api/v1/sample/sayhello", method: "GET" }).then(async (response) => {
      response.ok ? alert(JSON.stringify(await response.json())) : setError(response.statusText);
    });
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
