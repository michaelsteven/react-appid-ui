import React from "react";
import { useTranslation } from "react-i18next";

export function ChangePasswordPage() {
  const { t } = useTranslation("appid");

  return (
    <div className="page">
      <div className="title">{t("changepassword.page_title")}</div>
    </div>
  );
}
