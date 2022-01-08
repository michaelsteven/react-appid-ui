import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function SignupThankYouPage() {
  const { t } = useTranslation("appid");

  return (
    <div className="page">
      <div>
        <div>
          <div className="title">{t("signupthankyou.page_title")}</div>
          <div>{t("signupthankyou.message")}</div>
          <Link to="/login">{t("signupthankyou.login")}</Link>
        </div>
      </div>
    </div>
  );
}
